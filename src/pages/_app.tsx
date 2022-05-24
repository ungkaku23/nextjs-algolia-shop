import { useState, useEffect } from "react";
import Script from 'next/script';
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layouts/header/header";
import Footer from "../components/layouts/Footer/footer";
import { store } from '../components/redux/store';
import { Provider } from 'react-redux';

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
        <Header />

        <section
          className={`${loading === true ? "dark:animate-none animate-Loading " : ""}main-section`}
        >
          <Component {...pageProps} />
        </section>

        <Footer />
      </Provider>
    </>
  );
}
export default MyApp;
