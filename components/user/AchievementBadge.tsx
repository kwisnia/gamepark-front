import {
  Box,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { Achievement } from "../../types/achievements";

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked?: boolean;
}

const AchievementBadge = ({ achievement, unlocked }: AchievementBadgeProps) => {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Box>
          <Image
            src={achievement.icon}
            alt={achievement.name}
            width={128}
            height={128}
            className={unlocked ? "" : "locked-achievement"}
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader fontWeight="bold">
          <Flex justifyContent="space-between">
            <Heading size="md">{achievement.name}</Heading>
            <Text>+{achievement.points} points</Text>
          </Flex>
        </PopoverHeader>
        <PopoverBody>{achievement.description}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AchievementBadge;
