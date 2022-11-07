import { Box, Container, HStack, Skeleton, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import useSWR from "swr";
import useUserDetails from "../../hooks/useUserDetails";
import { BasicUserDetails } from "../../types/user";
import UserProfileHeader from "./UserProfileHeader";

interface UserLayoutPageProps {
  children: ReactNode;
}

const UserPageLayout = ({ children }: UserLayoutPageProps) => {
  const router = useRouter();

  const { username } = router.query;

  const { user, mutate } = useUserDetails(username as string);

  const tabsData = [
    {
      id: "user-info",
      label: "Info",
      href: `/users/${username}`,
    },
    {
      id: "user-lists",
      label: "Lists",
      href: `/users/${username}/lists`,
    },
    {
      id: "user-reviews",
      label: "Reviews",
      href: `/users/${username}/reviews`,
    },
    {
      id: "user-discussions",
      label: "Discussions",
      href: `/users/${username}/discussions`,
    },
    {
      id: "user-followers",
      label: "Followers",
      href: `/users/${username}/followers`,
    },
    {
      id: "user-following",
      label: "Following",
      href: `/users/${username}/following`,
    },
    {
      id: "user-achievements",
      label: "Achievements",
      href: `/users/${username}/achievements`,
    },
  ];

  return (
    <>
      <Container maxW="container.xl">
        {user ? (
          <UserProfileHeader user={user} mutate={mutate} />
        ) : (
          <Skeleton />
        )}
        <Box as="nav" aria-label="Component navigation" mt="8">
          <Stack
            as="ul"
            listStyleType="none"
            borderBottomWidth="1px"
            direction={{
              base: "column",
              md: "row",
            }}
          >
            {tabsData.map((item) => (
              <Box as="li" key={item.id}>
                <Link href={item.href}>
                  <Box
                    mb="-1px"
                    display="block"
                    fontSize="sm"
                    px="5"
                    py="3"
                    fontWeight="medium"
                    borderBottom="2px solid transparent"
                    data-selected={router.asPath === item.href ? "" : undefined}
                    _selected={{
                      color: "accent",
                      borderColor: "currentColor",
                    }}
                  >
                    {item.label}
                  </Box>
                </Link>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box pt={3}>{children}</Box>
      </Container>
    </>
  );
};

export default UserPageLayout;
