import { Box, chakra, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import GameparkLogo from "./assets/gamepark-logo.svg";
import IGDBLogo from "./assets/igdb-logo.svg";

const Footer = () => {
  return (
    <Flex
      w="full"
      as="footer"
      flexDir={{
        base: "column",
        sm: "row",
      }}
      align="center"
      justify="space-between"
      px="6"
      py="4"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
    >
      <Flex as="a" href="#" alignItems="center">
        <GameparkLogo width="3em" height="3em" fill="white" />
        <Heading
          fontSize="xl"
          fontWeight="bold"
          color="gray.600"
          paddingLeft={3}
          _dark={{
            color: "white",
            _hover: {
              color: "gray.300",
            },
          }}
        >
          GamePark
        </Heading>
      </Flex>

      <Stack>
        <Flex
          justifyContent="center"
          alignItems="center"
          gap={2}
          fontSize="sm"
          color="gray.400"
        >
          Game database powered by
          <Link href="https://www.igdb.com/">
            <Box
              fill="gray.400"
              _hover={{
                fill: "white",
              }}
            >
              <IGDBLogo width="2.5em" height="2.5em" />
            </Box>
          </Link>
        </Flex>
        <Text
          fontSize="sm"
          color="gray.600"
          _dark={{
            color: "gray.400",
          }}
        >
          Logo credit: Multiplayer by Hysen Drogu from{" "}
          <Link
            href="https://thenounproject.com/browse/icons/term/multiplayer/"
            title="Multiplayer Icons"
          >
            Noun Project
          </Link>
        </Text>
      </Stack>

      <Text
        py={{
          base: "2",
          sm: "0",
        }}
        color="gray.800"
        _dark={{
          color: "white",
        }}
      >
        All your base are belong to us
      </Text>
    </Flex>
  );
};

export default Footer;
