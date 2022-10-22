import 'tailwindcss/tailwind.css';
import '../style/style.scss';
import Layout from '../components/Layout';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AnimatePresence initial={false} exitBeforeEnter exit={{ opacity: 0 }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </AnimatePresence>
    </Provider>
  );
}

export default MyApp;
