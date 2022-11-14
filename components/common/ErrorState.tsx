import { Box, Center, Heading } from "@chakra-ui/react";
import Image from "next/image";

const ErrorState = () => {
  return (
    <Center flexDirection="column">
      <Image
        src="/qiqi-dead.png"
        width={300}
        height={300}
        alt="Error Qiqi image"
      />
      <Heading>
        Oopsie daisy, something went wrong. Please try again later.
      </Heading>
    </Center>
  );
};

export default ErrorState;
