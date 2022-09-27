import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { axiosClient } from "../constants";
import useUser from "../hooks/useUser";

const UserMenu = () => {
  const { user, mutate } = useUser();

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
        {user?.username}
      </MenuButton>
      <MenuList textColor="black">
        <MenuItem>Profile</MenuItem>
        <MenuDivider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
