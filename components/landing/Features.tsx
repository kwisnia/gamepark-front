import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

const AppFeatures = () => {
  return (
    <Box px={8} py={20} mx="auto">
      <SimpleGrid
        alignItems="start"
        columns={{
          base: 1,
          md: 2,
        }}
        mb={24}
        spacingY={{
          base: 10,
          md: 32,
        }}
        spacingX={{
          base: 10,
          md: 24,
        }}
      >
        <Box>
          <Heading
            mb={4}
            fontSize={{
              base: "2xl",
              md: "4xl",
            }}
            fontWeight="extrabold"
            letterSpacing="tight"
            textAlign={{
              base: "center",
              md: "left",
            }}
            color="gray.900"
            _dark={{
              color: "gray.400",
            }}
            lineHeight={{
              md: "shorter",
            }}
          >
            Many games to choose from
          </Heading>
          <Text
            mb={5}
            textAlign={{
              base: "center",
              sm: "left",
            }}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
            fontSize={{
              md: "lg",
            }}
          >
            Browse through thousands of available games and find your next
            adventure! You can select from games released on all platforms,
            including PC, Xbox, PlayStation, Nintendo Switch, and more!
          </Text>
        </Box>
        <Box w="full" h="full" position="relative">
          <Image
            width={1920}
            height={1080}
            src="/GameSelection.png"
            alt="Game selection"
            className={styles["app-feature-image"]}
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid
        alignItems="center"
        columns={{
          base: 1,
          md: 2,
        }}
        flexDirection="column-reverse"
        mb={24}
        spacingY={{
          base: 10,
          md: 32,
        }}
        spacingX={{
          base: 10,
          md: 24,
        }}
      >
        <Box
          order={{
            base: "initial",
            md: 2,
          }}
        >
          <Heading
            mb={4}
            fontSize={{
              base: "2xl",
              md: "4xl",
            }}
            fontWeight="extrabold"
            letterSpacing="tight"
            textAlign={{
              base: "center",
              md: "left",
            }}
            color="gray.900"
            _dark={{
              color: "gray.400",
            }}
            lineHeight={{
              md: "shorter",
            }}
          >
            Keep your favourites organized
          </Heading>
          <Text
            mb={5}
            textAlign={{
              base: "center",
              sm: "left",
            }}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
            fontSize={{
              md: "lg",
            }}
          >
            Keep your games organized in lists, so you can save your favourites
            and share them with the world!
          </Text>
        </Box>
        <Box w="full" h="full" position="relative">
          <Image
            width={1920}
            height={1080}
            src="/Lists.png"
            alt="Game selection"
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid
        alignItems="start"
        columns={{
          base: 1,
          md: 2,
        }}
        mb={24}
        spacingY={{
          base: 10,
          md: 32,
        }}
        spacingX={{
          base: 10,
          md: 24,
        }}
      >
        <Box>
          <Heading
            mb={4}
            fontSize={{
              base: "2xl",
              md: "4xl",
            }}
            fontWeight="extrabold"
            letterSpacing="tight"
            textAlign={{
              base: "center",
              md: "left",
            }}
            color="gray.900"
            _dark={{
              color: "gray.400",
            }}
            lineHeight={{
              md: "shorter",
            }}
          >
            Rate and review games
          </Heading>
          <Text
            mb={5}
            textAlign={{
              base: "center",
              sm: "left",
            }}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
            fontSize={{
              md: "lg",
            }}
          >
            Let others know what you think of the game by rating it and leaving
            a review!
          </Text>
        </Box>
        <Box w="full" h="full" position="relative">
          <Image
            width={1920}
            height={1080}
            src="/Reviews.png"
            alt="Game review"
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid
        alignItems="center"
        columns={{
          base: 1,
          md: 2,
        }}
        flexDirection="column-reverse"
        mb={24}
        spacingY={{
          base: 10,
          md: 32,
        }}
        spacingX={{
          base: 10,
          md: 24,
        }}
      >
        <Box
          order={{
            base: "initial",
            md: 2,
          }}
        >
          <Heading
            mb={4}
            fontSize={{
              base: "2xl",
              md: "4xl",
            }}
            fontWeight="extrabold"
            letterSpacing="tight"
            textAlign={{
              base: "center",
              md: "left",
            }}
            color="gray.900"
            _dark={{
              color: "gray.400",
            }}
            lineHeight={{
              md: "shorter",
            }}
          >
            Connect with the gaming world
          </Heading>
          <Text
            mb={5}
            textAlign={{
              base: "center",
              sm: "left",
            }}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
            fontSize={{
              md: "lg",
            }}
          >
            Share your favourite moments, opinions and experiences by creating a
            discussion for a specific game!
          </Text>
        </Box>
        <Box w="full" h="full" position="relative">
          <Image
            width={1920}
            height={1080}
            src="/Discussions.png"
            alt="Game selection"
            className={styles["app-feature-image"]}
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid
        alignItems="start"
        columns={{
          base: 1,
          md: 2,
        }}
        mb={24}
        spacingY={{
          base: 10,
          md: 32,
        }}
        spacingX={{
          base: 10,
          md: 24,
        }}
      >
        <Box>
          <Heading
            mb={4}
            fontSize={{
              base: "2xl",
              md: "4xl",
            }}
            fontWeight="extrabold"
            letterSpacing="tight"
            textAlign={{
              base: "center",
              md: "left",
            }}
            color="gray.900"
            _dark={{
              color: "gray.400",
            }}
            lineHeight={{
              md: "shorter",
            }}
          >
            Express yourself
          </Heading>
          <Text
            mb={5}
            textAlign={{
              base: "center",
              sm: "left",
            }}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
            fontSize={{
              md: "lg",
            }}
          >
            Earn points by completing achivements for engaging with the
            community. Earning points will allow you to customize your profile
            so you are able to express yourself to the world!
          </Text>
        </Box>
        <Box w="full" h="full" position="relative">
          <Image
            width={1920}
            height={1080}
            src="/Profiles.png"
            alt="User profiles"
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default AppFeatures;
