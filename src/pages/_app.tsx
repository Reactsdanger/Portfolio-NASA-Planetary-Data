import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { client } from "./api/Query/ReactQueryClient";
import { Provider } from 'react-redux'
import { store } from "./api/Compos/Redux/ReduxStore";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  )
}
