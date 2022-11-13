import { Box, Container, Heading, Stack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import DiscussionMainPost from "../../../../components/discussions/DiscussionMainPost";
import DiscussionReplyPost from "../../../../components/discussions/DiscussionReplyPost";
import DiscussionReplyForm from "../../../../components/discussions/DiscussionReplyForm";
import useDiscussionPosts from "../../../../hooks/useDiscussionPosts";
import type {
  DiscussionPostForm,
  GameDiscussion,
} from "../../../../types/discussion";
import type { FormikHelpers } from "formik";
import { createDiscussionPost } from "../../../../api/DiscussionApi";
import invariant from "tiny-invariant";
import { useInView } from "react-intersection-observer";
import type { GetServerSideProps } from "next";
import { getGameShortInfo } from "../../../../api/GamesApi";
import { GameListElement } from "../../../../types/game";
import Head from "next/head";
import { useSpinDelay } from "spin-delay";
import DiscussionMainPostSkeleton from "../../../../components/discussions/DiscussionMainPostSkeleton";
import useLoggedInUser from "../../../../hooks/useLoggedInUser";
import DiscussionReplyPostSkeleton from "../../../../components/discussions/DiscussionReplyPostSkeleton";

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
  const { loggedOut } = useLoggedInUser();
  const {
    data: discussion,
    error,
    mutate: mutateDiscussion,
  } = useSWRImmutable<GameDiscussion>(
    slug && discussionId ? `/games/${slug}/discussions/${discussionId}` : null
  );
  const {
    posts,
    mutate,
    fetchNextPage,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = useDiscussionPosts(slug as string, Number(discussionId));
  const toast = useToast();
  const { ref, inView } = useInView();

  const isLoadingDiscussion = !discussion && !error;
  const flatPosts = useMemo(() => {
    return posts?.flat() ?? [];
  }, [posts]);

  const shouldRenderDiscussionSkeleton = useSpinDelay(isLoadingDiscussion);
  const shouldRenderRepliesSkeleton =
    useSpinDelay(isLoadingInitialData) || isLoadingMore;

  useEffect(() => {
    if (inView && !isReachingEnd) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isReachingEnd]);

  const handleSubmit = async (
    values: DiscussionPostForm,
    helpers: FormikHelpers<DiscussionPostForm>
  ) => {
    try {
      invariant(discussion, "Discussion is required");
      await createDiscussionPost(discussion.game, discussion.id, values);
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

  const title = discussion
    ? `${discussion.title} - ${gameInfo.name} - Game Park`
    : "Loading...";

  if (error) {
    router.replace("/404");
  }

  return (
    <Container maxW="container.xl">
      <Head>
        <title>{title}</title>
      </Head>
      {discussion && !shouldRenderDiscussionSkeleton ? (
        <>
          <DiscussionMainPost
            discussion={discussion}
            game={gameInfo}
            mutate={mutateDiscussion}
          />
          <Heading>Replies</Heading>
          {loggedOut ? null : <DiscussionReplyForm onSubmit={handleSubmit} />}
          <Stack pt={10}>
            {flatPosts.map((post) => (
              <DiscussionReplyPost
                key={`post-${post.id}`}
                discussion={discussion}
                post={post}
                mutate={mutate}
                withActions
              />
            ))}
            {shouldRenderRepliesSkeleton
              ? [...Array(3)].map((_, i) => (
                  <DiscussionReplyPostSkeleton key={`reply-skeleton-${i}`} />
                ))
              : null}
          </Stack>
          <Box h={1} ref={ref} />
        </>
      ) : (
        <DiscussionMainPostSkeleton />
      )}
    </Container>
  );
};

export default DiscussionPage;
