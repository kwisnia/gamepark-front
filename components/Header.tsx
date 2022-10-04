import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { axiosClient } from "../constants";
import { LoginModalContext } from "../contexts/LoginModalContext";
import useLoggedInUser from "../hooks/useLoggedInUser";
import LoginModal from "./login/LoginModal";
import UserMenu from "./UserMenu";

const Header = () => {
  const { user, mutate, loggedOut } = useLoggedInUser();
  const { setFormType, openModal } = useContext(LoginModalContext);

  const openForm = (type: "Login" | "Register") => {
    setFormType(type);
    openModal();
  };

  return (
    <Box className="w-full h-12 bg-slate-700 flex justify-between z-10">
      <Heading>Gaming</Heading>
      <Center>
        {!loggedOut && user ? (
          <Center>
            <UserMenu />
          </Center>
        ) : (
          <Flex>
            <Button colorScheme={"orange"} onClick={() => openForm("Login")}>
              Login
            </Button>
            <Button colorScheme={"green"} onClick={() => openForm("Register")}>
              Register
            </Button>
          </Flex>
        )}
      </Center>
    </Box>
  );
};

export default Header;
