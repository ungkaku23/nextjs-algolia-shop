import { useState, useEffect } from "react";
import Script from 'next/script';
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layouts/header/header";
import Footer from "../components/layouts/Footer/footer";
import { store } from '../components/redux/store';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 250);

    return () => {
      setLoading(true);
    };
  }, [pageProps]);

  return (
    <>
      <Provider store={store}>
        <NextUIProvider>
          <Header />

          <section
            className={`${loading === true ? "dark:animate-none animate-Loading " : ""}main-section`}
          >
            <Component {...pageProps} />
          </section>

          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </NextUIProvider>
      </Provider>
    </>
  );
}
export default MyApp;
