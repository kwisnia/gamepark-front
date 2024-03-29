import {
  Button,
  Center,
  chakra,
  Flex,
  HStack,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useLoginModal } from "../contexts/LoginModalContext";
import { LoginModalTypes } from "../contexts/LoginModalContext";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { AiFillHome, AiFillSound, AiOutlineSound } from "react-icons/ai";
import { GiConsoleController } from "react-icons/gi";
import GameparkLogo from "./assets/gamepark-logo.svg";
import UserMenu from "./UserMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileHeaderMenu from "./header/MobileHeaderMenu";
import GameAutocomplete from "./GameAutocomplete";
import { BsChatRightFill, BsPeopleFill } from "react-icons/bs";
import { useWebSocket } from "../contexts/WebSocketContext";

const Header = () => {
  const { user, loggedOut } = useLoggedInUser();
  const { setFormType, openModal } = useLoginModal();
  const { soundEnabled, toggleSound } = useWebSocket();
  const mobileNav = useDisclosure();
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.800");
  const { slug } = router.query;

  const openForm = (type: LoginModalTypes) => {
    setFormType(type);
    openModal();
  };

  const mainPage = user && !loggedOut ? "/dashboard" : "/";

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
      zIndex={20}
    >
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack display="flex" spacing={3} alignItems="center" zIndex={10}>
          <MobileHeaderMenu backgroundColor={bg} />
          <Link href={mainPage} title="Gamepark home page">
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
              onClick={() => router.push(mainPage)}
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              leftIcon={<Icon as={GiConsoleController} />}
              size="sm"
              onClick={() => router.push("/games")}
            >
              Games
            </Button>
            {user ? (
              <Button
                variant="ghost"
                leftIcon={<Icon as={BsChatRightFill} />}
                size="sm"
                onClick={() => router.push("/chat")}
              >
                Chat
              </Button>
            ) : null}
            <Button
              variant="ghost"
              leftIcon={<Icon as={BsPeopleFill} />}
              size="sm"
              onClick={() => router.push("/users")}
            >
              Users
            </Button>
          </HStack>
        </HStack>
        <HStack
          spacing={3}
          display={mobileNav.isOpen ? "none" : "flex"}
          alignItems="center"
        >
          <IconButton
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            title={soundEnabled ? "Disable sound" : "Enable sound"}
            aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
            icon={<Icon as={soundEnabled ? AiFillSound : AiOutlineSound} />}
          />
          <GameAutocomplete />
          <Center>
            {!loggedOut && user ? (
              <Center>
                <UserMenu />
              </Center>
            ) : (
              <Flex gap={5}>
                <Button
                  variant="link"
                  onClick={() => openForm(LoginModalTypes.Login)}
                >
                  Sign in
                </Button>
                <Button
                  colorScheme={"green"}
                  onClick={() => openForm(LoginModalTypes.Register)}
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
