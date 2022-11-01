import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";

interface NotificationProps {
  message: string;
  image: string;
  title: string;
}

const Notification = ({ message, image, title }: NotificationProps) => {
  return (
    <Flex
      maxW="sm"
      w="full"
      mx="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      shadow="md"
      rounded="lg"
      overflow="hidden"
    >
      <Flex
        w={2}
        bg="gray.800"
        _dark={{
          bg: "gray.900",
        }}
      ></Flex>

      <Flex alignItems="center" px={2} py={3}>
        <Avatar boxSize={10} src={image} />
        <Box mx={3}>
          <Text fontWeight="bold">{title}</Text>
          <Text
            color="gray.600"
            _dark={{
              color: "gray.200",
            }}
          >
            {message}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Notification;
