import { chakra, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { LoginModalProvider } from "../contexts/LoginModalContext";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useNavigationProgress } from "../contexts/NavigationProgressContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { start, done } = useNavigationProgress();

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        start();
      }
    };
    const handleComplete = () => done();
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, done, start]);

  return (
    <LoginModalProvider>
      <Flex flexDirection="column" minHeight="100vh" width="full">
        <Header />
        <chakra.main
          flex={1}
          position="relative"
          display="flex"
          className="bg-gray-900 main-container"
        >
          {children}
        </chakra.main>
        <Footer />
      </Flex>
    </LoginModalProvider>
  );
};

export default Layout;
