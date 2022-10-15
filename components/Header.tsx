import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  CloseButton,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { LoginModalContext } from "../contexts/LoginModalContext";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { AiFillHome } from "react-icons/ai";
import { GiConsoleController } from "react-icons/gi";
import Image from "next/future/image";
import GameparkLogo from "./common/Logo";
import UserMenu from "./UserMenu";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { user, mutate, loggedOut } = useLoggedInUser();
  const { setFormType, openModal } = useContext(LoginModalContext);
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
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
          <Box
            display={{
              base: "inline-flex",
              md: "none",
            }}
            justifyContent="center"
          >
            <IconButton
              display={{
                base: "flex",
                md: "none",
              }}
              aria-label="Open menu"
              fontSize="20px"
              color="gray.800"
              _dark={{
                color: "inherit",
              }}
              variant="ghost"
              icon={<HamburgerIcon />}
              onClick={mobileNav.onOpen}
            />
            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              bg={bg}
              spacing={3}
              rounded="sm"
              shadow="sm"
            >
              <CloseButton
                aria-label="Close menu"
                justifySelf="self-start"
                onClick={mobileNav.onClose}
              />
              <Button
                w="full"
                variant="ghost"
                leftIcon={<Icon as={AiFillHome} />}
              >
                Dashboard
              </Button>
              <Button
                w="full"
                variant="ghost"
                leftIcon={<Icon as={GiConsoleController} />}
              >
                Games
              </Button>
            </VStack>
          </Box>
          <Link href="/" passHref>
            <chakra.a
              title="Gamepark Home Page"
              display="flex"
              alignItems="center"
            >
              <GameparkLogo fill="white" />
              <VisuallyHidden>Gamepark</VisuallyHidden>
            </chakra.a>
          </Link>

          <HStack
            spacing={3}
            display={{
              base: "none",
              md: "inline-flex",
            }}
          >
            <Link href="/">
              <Button
                variant="ghost"
                leftIcon={<Icon as={AiFillHome} />}
                size="sm"
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/games">
              <Button
                variant="ghost"
                leftIcon={<Icon as={GiConsoleController} />}
                size="sm"
              >
                Games
              </Button>
            </Link>
          </HStack>
        </HStack>
        <HStack
          spacing={3}
          display={mobileNav.isOpen ? "none" : "flex"}
          alignItems="center"
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon />
            </InputLeftElement>
            <Input type="tel" placeholder="Search..." />
          </InputGroup>

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
