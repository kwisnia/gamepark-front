import { Container, Flex, Skeleton, Spacer, Stack } from "@chakra-ui/react";

const GameDetailsSkeleton = () => {
  return (
    <Container maxW="container.xl">
      <Flex
        alignItems="end"
        justifyContent="center"
        marginTop="8%"
        w="full"
        mb="20"
      >
        <Flex
          direction={{
            base: "column",
            md: "row",
          }}
          justifyContent="space-between"
          zIndex={1}
          w="full"
        >
          <Skeleton height={374} width={264} rounded="lg" margin="auto" />
          <Flex
            flex={8}
            direction="column"
            alignItems="center"
            justifyContent="end"
            paddingX="auto"
            paddingBottom={10}
            zIndex={1}
          >
            <Skeleton height={10} width="50%" />
          </Flex>
          <Flex justifyContent="center" flex={3} w="full">
            <Flex
              direction="column"
              justifyContent="end"
              alignItems="center"
              paddingBottom={10}
              w="full"
              gap={3}
            >
              <Skeleton height={150} width={150} rounded="full" />
              <Skeleton height={10} width="full" />
            </Flex>
            <Flex
              direction="column"
              justifyContent="end"
              alignItems="center"
              paddingBottom={10}
              paddingLeft={5}
              w="full"
              gap={3}
            >
              <Skeleton height={120} width={120} rounded="full" />
              <Skeleton height={10} width="full" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Stack w="full" flex={8}>
          <Skeleton height={5} width="90%" />
          <Skeleton height={5} width="90%" />
          <Skeleton height={5} width="90%" />
          <Skeleton height={5} width="90%" />
          <Skeleton height={5} width="90%" />
        </Stack>
        <Flex flex={2} rounded="md" bg="gray.700" padding={5}>
          <Stack w="full" spacing={3}>
            <Skeleton height={5} width="50%" />
            <Skeleton height={5} width="full" />
            <Skeleton height={5} width="50%" />
            <Skeleton height={5} width="full" />
            <Skeleton height={5} width="50%" />
            <Skeleton height={5} width="full" />
          </Stack>
        </Flex>
      </Flex>
    </Container>
  );
};

export default GameDetailsSkeleton;
