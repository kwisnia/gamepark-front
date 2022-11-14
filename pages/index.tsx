import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  SlideFade,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import AppFeatures from "../components/landing/Features";
import { LoginModalTypes, useLoginModal } from "../contexts/LoginModalContext";
import useLoggedInUser from "../hooks/useLoggedInUser";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { openModal, setFormType } = useLoginModal();
  const { user, loggedOut } = useLoggedInUser();
  const router = useRouter();

  if (user && !loggedOut) {
    router.replace("/dashboard");
  }

  return (
    <Box position="relative" minH="100vh">
      <Head>
        <title>GamePark - Gaming social platform</title>
        <meta name="description" content="GamePark landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/GameParkBG.png"
        width={1920}
        height={1080}
        alt="GamePark"
        className={`opacity-20 ${styles["game-header-image"]} absolute w-full`}
        priority
      />
      <Container
        maxW="container.xl"
        zIndex={10}
        position="relative"
        centerContent
      >
        <Flex direction="column" h="100vh" alignItems="center">
          <Stack m="auto">
            <SlideFade
              in={true}
              offsetY={-40}
              transition={{
                enter: {
                  duration: 1.25,
                },
              }}
            >
              <Heading
                fontSize={{
                  base: "6xl",
                  md: "6xl",
                  lg: "8xl",
                }}
              >
                Welcome to{" "}
                <Text
                  display="inline"
                  w="full"
                  bgClip="text"
                  bgGradient="linear(to-r, green.400,purple.500)"
                  fontWeight="extrabold"
                >
                  GamePark
                </Text>
                !
              </Heading>
            </SlideFade>
          </Stack>
          <motion.div
            animate={{ y: 20 }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              repeatType: "reverse",
            }}
          >
            <ArrowDownIcon fontSize={48} mb={32} />
          </motion.div>
        </Flex>
        <Stack alignItems="center" shadow="xl">
          <Heading size="2xl">
            Welcome to the ultimate gaming social platform!
          </Heading>
          <AppFeatures />
          <Center flexDirection="column" pb={10}>
            <Heading fontWeight="extrabold">Ready to dive in?</Heading>
            <Heading color="gray.400" fontWeight="extrabold">
              Create an account and join us!
            </Heading>
            <Button
              colorScheme="green"
              size="lg"
              mt={8}
              onClick={() => {
                setFormType(LoginModalTypes.Register);
                openModal();
              }}
            >
              Get started
            </Button>
          </Center>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
