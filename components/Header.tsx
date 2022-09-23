import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { axiosClient } from "../constants";
import useUser from "../hooks/useUser";
import LoginModal from "./login/LoginModal";

const Header = () => {
  const { user, mutate, loggedOut } = useUser();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState<"Login" | "Register">("Login");

  const openForm = (type: "Login" | "Register") => {
    setFormType(type);
    setIsFormVisible(true);
  };

  const logout = () => {
    localStorage.removeItem("gaming-token");
    axiosClient.defaults.headers.common.Authorization = "";
    mutate();
  };

  return (
    <Box className="w-full h-12 text-white bg-slate-700 flex justify-between">
      <Heading>Gaming</Heading>
      <Center>
        {!loggedOut && user ? (
          <Center>
            <Text className="mr-2">{user.username}</Text>
            <Button colorScheme={"red"} onClick={() => logout()}>
              Logout
            </Button>
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
      <LoginModal
        isOpen={isFormVisible}
        formType={formType}
        onRequestClose={() => setIsFormVisible(false)}
        mutate={mutate}
      />
    </Box>
  );
};

export default Header;
