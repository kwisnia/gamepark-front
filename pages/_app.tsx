import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Layout from "../components/Layout";
import { axiosClient } from "../constants";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { LoadingProgressProvider } from "../contexts/NavigationProgressContext";

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
        <LoadingProgressProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LoadingProgressProvider>
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
