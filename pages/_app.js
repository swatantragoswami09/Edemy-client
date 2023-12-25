import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "../public/css/styles.css";
import TopNav from "../components/TopNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import DarkModeProvider from "../context/DarkModeContext";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-4D0ZB4C2ZH" />
        <script id="google-analytics" strategy="afterInteractive" >
          {
            `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4D0ZB4C2ZH')
          `
          }

        </script>
      </Head>
      <DarkModeProvider>
        <Provider>
          <ToastContainer position="top-center" />
          <TopNav />
          <Component {...pageProps} />
        </Provider>
      </DarkModeProvider>
    </>
  );
}

export default MyApp;
