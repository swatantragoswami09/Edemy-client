import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "../public/css/styles.css";
import TopNav from "../components/TopNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import DarkModeProvider from "../context/DarkModeContext";

function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <Provider>
        <ToastContainer position="top-center" />
        <TopNav />
        <Component {...pageProps} />
      </Provider>
    </DarkModeProvider>
  );
}

export default MyApp;
