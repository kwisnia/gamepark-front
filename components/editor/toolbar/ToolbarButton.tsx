import { IconButton } from "@chakra-ui/react";
import { ReactElement } from "react";

interface ToolbarButtonProps {
  icon: ReactElement;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const ToolbarButton = (props: ToolbarButtonProps) => {
  const { icon, label, onClick, isActive } = props;

  return (
    <IconButton
      onClick={onClick}
      variant="ghost"
      colorScheme={isActive ? "blue" : "gray"}
      aria-label={label}
      icon={icon}
    />
  );
};

export default ToolbarButton;
