import { Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <Stack alignItems="center">
      <Flex>
        {[0, 1, 2, 3, 4].map((i) => (
          <Image
            key={`missing-heart-${i}`}
            src="/heart.svg"
            alt="Missing heart"
            width={64}
            height={64}
          />
        ))}
      </Flex>
      <Text fontWeight="bold" fontSize="xl">
        {message}
      </Text>
    </Stack>
  );
};

export default EmptyState;
