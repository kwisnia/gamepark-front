import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Layout from "../components/Layout";
import { axiosClient } from "../constants";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { NavigationProgressProvider } from "../contexts/NavigationProgressContext";
import { WebSocketProvider } from "../contexts/WebsocketContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
        fetcher: (url) => {
          return axiosClient.get(url).then((res) => res.data);
        },
      }}
    >
      <ChakraProvider theme={theme}>
        <NavigationProgressProvider>
          <WebSocketProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WebSocketProvider>
        </NavigationProgressProvider>
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
