import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const NotFoundPage: NextPage = () => {
  const router = useRouter();

  return (
    <Center fontFamily="'Press Start 2P'" flexDirection="column" flex={1}>
      <Head>
        <title>Page not found - GamePark</title>
      </Head>
      <Image
        src="/Mario upper.png"
        alt="404 mario"
        width={1920}
        height={900}
        className="w-full"
      />
      <Center flex={8} flexDirection="column">
        <Heading
          fontSize="8xl"
          position="relative"
          zIndex={1}
          fontFamily="'Press Start 2P'"
        >
          404
        </Heading>
        <Text fontSize="3xl" zIndex={1}>
          YOUR PRINCESS IS IN ANOTHER CASTLE!
        </Text>
        <Button onClick={() => router.back()}>Go back</Button>
      </Center>
      <Image
        src="/Mario lower.png"
        alt="404 mario"
        width={1920}
        height={900}
        className="w-full"
      />
    </Center>
  );
};

export default NotFoundPage;
