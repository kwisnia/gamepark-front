import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { axiosClient } from "../constants";
import useUser from "../hooks/useUser";
import LoginModal from "./login/LoginModal";
import UserMenu from "./UserMenu";

const Header = () => {
  const { user, mutate, loggedOut } = useUser();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState<"Login" | "Register">("Login");

  const openForm = (type: "Login" | "Register") => {
    setFormType(type);
    setIsFormVisible(true);
  };

  return (
    <Box className="w-full h-12 text-white bg-slate-700 flex justify-between z-10">
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
