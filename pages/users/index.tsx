import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSpinDelay } from "spin-delay";
import { useDebouncedCallback } from "use-debounce";
import EmptyState from "../../components/common/EmptyState";
import UserProfileOverview from "../../components/user/UserProfileOverview";
import UserProfileOverviewSkeleton from "../../components/user/UserProfileOverviewSkeleton";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import useUsers from "../../hooks/useUsers";

const UserSearchPage: NextPage = () => {
  const {
    users,
    setSearch,
    fetchNextPage,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = useUsers();

  const { user: loggedInUser } = useLoggedInUser();
  const { ref, inView } = useInView();
  const shouldRenderSkeletons =
    useSpinDelay(isLoadingInitialData) || isLoadingMore;

  useEffect(() => {
    if (inView && !isReachingEnd) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isReachingEnd]);

  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    500
  );

  return (
    <Container maxW="container.xl" p={3}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search for a user by username"
          onChange={handleSearchChange}
          backgroundColor="gray.600"
          border={"none"}
          width={{
            base: "100%",
            md: "50%",
          }}
        />
      </InputGroup>
      <Spacer h={5} />
      {!isLoadingInitialData ? (
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={4}
        >
          {users.map((user) => (
            <UserProfileOverview
              key={user.id}
              user={user}
              isCurrentUser={user.id === loggedInUser?.id}
            />
          ))}
        </SimpleGrid>
      ) : null}
      {shouldRenderSkeletons ? (
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={4}
        >
          {[...Array(6)].map((_, index) => (
            <UserProfileOverviewSkeleton key={`follow-skeleton-${index}`} />
          ))}
        </SimpleGrid>
      ) : null}
      {isEmpty && !isLoadingInitialData ? (
        <EmptyState message="This user is not following anyone" />
      ) : null}
      <Box h={1} ref={ref} />
    </Container>
  );
};

export default UserSearchPage;
