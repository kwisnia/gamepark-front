import { Progress, useBoolean } from "@chakra-ui/react";
import {
  createContext,
  ReactElement,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import invariant from "tiny-invariant";
import NavigationProgressBar from "../components/common/NavigationProgressBar";

type NavigationProgressContextProps = {
  children: ReactNode;
};

interface Progress {
  value: number;
  start: () => void;
  done: () => void;
}

const NavigationProgressContext = createContext<Progress | undefined>(
  undefined
);

export const NavigationProgressProvider = ({
  children,
}: NavigationProgressContextProps): ReactElement => {
  const step = useRef(5);
  const [value, setValue] = useState(0);
  const [isOn, setOn] = useBoolean(false);

  useEffect(() => {
    if (isOn) {
      let timeout: NodeJS.Timeout;

      if (value < 20) {
        step.current = 5;
      } else if (value < 40) {
        step.current = 4;
      } else if (value < 60) {
        step.current = 3;
      } else if (value < 80) {
        step.current = 2;
      } else {
        step.current = 1;
      }

      if (value <= 98) {
        timeout = setTimeout(() => {
          setValue(value + step.current);
        }, 500);
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [value, isOn]);

  const start = () => {
    setValue(0);
    setOn.on();
  };

  const done = () => {
    setValue(100);
    setTimeout(() => {
      setOn.off();
    }, 200);
  };

  return (
    <NavigationProgressContext.Provider
      value={{
        value,
        start,
        done,
      }}
    >
      {isOn ? <NavigationProgressBar /> : null}
      {children}
    </NavigationProgressContext.Provider>
  );
};

export const useNavigationProgress = (): Progress => {
  const context = useContext(NavigationProgressContext);
  invariant(
    context !== undefined,
    "useNavigationProgress must be used within NavigationProgressProvider"
  );
  return context;
};
