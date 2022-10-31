import { Box, CircularProgress, Progress, VStack } from "@chakra-ui/react";
import { useNavigationProgress } from "../../contexts/NavigationProgressContext";

const NavigationProgressBar = () => {
  const { value } = useNavigationProgress();

  return (
    <Box position="absolute" top={0} left={0} right={0}>
      <Progress value={value} size="xs" width="100%" />
    </Box>
  );
};

export default NavigationProgressBar;
