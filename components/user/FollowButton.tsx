import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import { followUser, unfollowUser } from "../../api/UserApi";

interface FollowButtonProps {
  username: string;
}

const FollowButton = ({ username }: FollowButtonProps) => {
  const { data: followStatus, mutate } = useSWR<boolean>(`/follow/${username}`);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await followUser(username);
      mutate(!followStatus);
    } catch (e) {
      const error = e as Error;
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setIsLoading(true);
      await unfollowUser(username);
      mutate(!followStatus);
    } catch (e) {
      const error = e as Error;
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return followStatus === undefined ? null : followStatus ? (
    <Button
      colorScheme="red"
      size="sm"
      onClick={handleUnfollow}
      isLoading={isLoading}
    >
      Stop following
    </Button>
  ) : (
    <Button
      colorScheme="blue"
      size="sm"
      onClick={handleFollow}
      isLoading={isLoading}
    >
      Follow
    </Button>
  );
};

export default FollowButton;
