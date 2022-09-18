import "../styles/globals.css";
import type { AppProps } from "next/app";
import Modal from "react-modal";
import { SWRConfig } from "swr";
import Layout from "../components/Layout";
import { axiosClient } from "../constants";

Modal.setAppElement("#__next");

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
