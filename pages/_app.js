import "../styles/globals.css";
import { Provider } from "react-redux";
import ModalRoot from "../components/ModalRoot";
import store from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ModalRoot />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
