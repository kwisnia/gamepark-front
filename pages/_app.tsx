import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Layout from "../components/Layout";
import { axiosClient } from "../constants";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
        fetcher: (url) => {
          console.log(axiosClient.defaults.headers.common);
          return axiosClient.get(url).then((res) => res.data);
        },
      }}
    >
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
