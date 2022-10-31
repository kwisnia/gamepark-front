import {
  Button,
  Center,
  chakra,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useLoginModal } from "../contexts/LoginModalContext";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { AiFillHome } from "react-icons/ai";
import { GiConsoleController } from "react-icons/gi";
import GameparkLogo from "./assets/gamepark-logo.svg";
import UserMenu from "./UserMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileHeaderMenu from "./header/MobileHeaderMenu";
import GameAutocomplete from "./GameAutocomplete";

const Header = () => {
  const { user, loggedOut } = useLoggedInUser();
  const { setFormType, openModal } = useLoginModal();
  const mobileNav = useDisclosure();
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.800");
  const { slug } = router.query;

  const openForm = (type: "Login" | "Register") => {
    setFormType(type);
    openModal();
  };
  useEffect(() => {
    console.log(slug);
  }, [slug]);

  return (
    <chakra.header
      bg={slug ? "transparent" : bg}
      w="full"
      px={{
        base: 2,
        sm: 4,
      }}
      py={4}
      shadow="md"
      zIndex={10}
    >
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack display="flex" spacing={3} alignItems="center" zIndex={10}>
          <MobileHeaderMenu backgroundColor={bg} />
          <Link href="/" title="Gamepark home page">
            <GameparkLogo width="3em" height="3em" fill="white" />
            <VisuallyHidden>Gamepark</VisuallyHidden>
          </Link>

          <HStack
            spacing={3}
            display={{
              base: "none",
              md: "inline-flex",
            }}
          >
            <Button
              variant="ghost"
              leftIcon={<Icon as={AiFillHome} />}
              size="sm"
            >
              <Link href="/">Dashboard</Link>
            </Button>
            <Button
              variant="ghost"
              leftIcon={<Icon as={GiConsoleController} />}
              size="sm"
            >
              <Link href="/games">Games</Link>
            </Button>
          </HStack>
        </HStack>
        <HStack
          spacing={3}
          display={mobileNav.isOpen ? "none" : "flex"}
          alignItems="center"
        >
          <GameAutocomplete />

          <Center>
            {!loggedOut && user ? (
              <Center>
                <UserMenu />
              </Center>
            ) : (
              <Flex gap={5}>
                <Button variant="link" onClick={() => openForm("Login")}>
                  Sign in
                </Button>
                <Button
                  colorScheme={"green"}
                  onClick={() => openForm("Register")}
                  display={{
                    base: "none",
                    md: "flex",
                  }}
                >
                  Register
                </Button>
              </Flex>
            )}
          </Center>
        </HStack>
      </Flex>
    </chakra.header>
  );
};

export default Header;
