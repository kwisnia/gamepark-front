import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  Icon,
  IconButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import { BsChatRightFill } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";
import useLoggedInUser from "../../hooks/useLoggedInUser";

interface MobileHeaderMenuProps {
  backgroundColor: string;
}

const MobileHeaderMenu = ({ backgroundColor }: MobileHeaderMenuProps) => {
  const mobileNav = useDisclosure();
  const { user } = useLoggedInUser();
  const router = useRouter();

  return (
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
        bg={backgroundColor}
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
          onClick={() => router.push(user ? "/dashboard" : "/")}
        >
          Dashboard
        </Button>
        <Button
          w="full"
          variant="ghost"
          leftIcon={<Icon as={GiConsoleController} />}
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
      </VStack>
    </Box>
  );
};

export default MobileHeaderMenu;
