import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
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
import { useInView } from "react-intersection-observer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getGameShortInfo } from "../../../../api/GamesApi";
import { GameListElement } from "../../../../types/game";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    const gameInfo = await getGameShortInfo(slug as string);
    return {
      props: {
        gameInfo,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const DiscussionPage = ({ gameInfo }: { gameInfo: GameListElement }) => {
  const router = useRouter();
  const { slug, discussionId } = router.query;
  const {
    data: discussion,
    error,
    mutate: mutateDiscussion,
  } = useSWRImmutable<GameDiscussion>(
    slug && discussionId ? `/games/${slug}/discussions/${discussionId}` : null
  );
  const { posts, mutate, fetchNextPage } = useDiscussionPosts(
    slug as string,
    Number(discussionId)
  );
  const toast = useToast();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

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
            game={gameInfo}
            mutate={mutateDiscussion}
          />
          <Heading>Replies</Heading>
          <DiscussionReplyForm onSubmit={handleSubmit} />
          <Stack pt={10}>
            {flatPosts.map((post) => (
              <DiscussionReplyPost
                key={`post-${post.id}`}
                discussion={discussion}
                post={post}
                mutate={mutate}
              />
            ))}
          </Stack>
          <Box h={1} ref={ref} />
        </>
      ) : (
        <Heading>Loading</Heading>
      )}
    </Container>
  );
};

export default DiscussionPage;
