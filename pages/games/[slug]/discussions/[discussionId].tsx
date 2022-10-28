import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo, useRef } from "react";
import useSWRImmutable from "swr/immutable";
import DiscussionMainPost from "../../../../components/discussions/DiscussionMainPost";
import DiscussionReplyPost from "../../../../components/discussions/DiscussionReplyPost";
import DiscussionReplyForm from "../../../../components/discussions/DiscussionReplyForm";
import useDiscussionPosts from "../../../../hooks/useDiscussionPosts";
import {
  DiscussionPostForm,
  GameDiscussion,
} from "../../../../types/discussion";
import { FormikHelpers } from "formik";
import { createDiscussionPost } from "../../../../api/DiscussionApi";
import invariant from "tiny-invariant";

const DiscussionPage = () => {
  const router = useRouter();
  const { slug, discussionId } = router.query;
  const {
    data: discussion,
    error,
    mutate: mutateDiscussion,
  } = useSWRImmutable<GameDiscussion>(
    `/games/${slug}/discussions/${discussionId}`
  );
  const { posts, mutate } = useDiscussionPosts(
    slug as string,
    Number(discussionId)
  );
  const toast = useToast();
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

  const flatPosts = useMemo(() => {
    return posts?.flat() ?? [];
  }, [posts]);

  const handleSubmit = async (
    values: DiscussionPostForm,
    helpers: FormikHelpers<DiscussionPostForm>
  ) => {
    try {
      invariant(discussion, "Discussion is required");
      await createDiscussionPost(discussion.game, discussion.id, values);
      console.log(values);
      toast({
        title: "Reply created",
        description: "Your reply has been created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      helpers.setFieldValue("body", "");
      mutate();
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to create a reply",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Container maxW="container.xl">
      {discussion ? (
        <>
          <DiscussionMainPost
            discussion={discussion}
            mutate={mutateDiscussion}
          />
          <Heading>Replies</Heading>
          <DiscussionReplyForm onSubmit={handleSubmit} />
          <Stack pt={10}>
            {flatPosts.map((post, index) => (
              <DiscussionReplyPost
                key={`post-${post.id}`}
                discussion={discussion}
                post={post}
                mutate={mutate}
                originalPost={flatPosts.find(
                  (displayedPost) => displayedPost.id === post.originalPostID
                )}
                originalPostRef={
                  postRefs.current[
                    flatPosts.findIndex(
                      (displayedPost) =>
                        displayedPost.id === post.originalPostID
                    )
                  ]
                }
                ref={(ref) => {
                  postRefs.current[index] = ref;
                }}
              />
            ))}
          </Stack>
        </>
      ) : (
        <Heading>Loading</Heading>
      )}
    </Container>
  );
};

export default DiscussionPage;
