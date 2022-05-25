import "tailwindcss/tailwind.css";
import "../style/style.scss";
import Layout from "../components/Layout";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AnimatePresence initial={false} exitBeforeEnter exit={{ opacity: 0 }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
    </Provider>
  );
}

export default MyApp;
