import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { axiosClient } from "../constants";
import useLoggedInUser from "../hooks/useLoggedInUser";

const UserMenu = () => {
  const { user, mutate } = useLoggedInUser();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("gaming-token");
    axiosClient.defaults.headers.common.Authorization = "";
    mutate();
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<Avatar />}
        bg="transparent"
        _active={{ background: "transparent" }}
        _hover={{ background: "transparent" }}
      >
        {user?.displayName}
      </MenuButton>
      <MenuList textColor="black">
        <MenuItem onClick={() => router.push(`/users/${user?.username}`)}>
          Profile
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
