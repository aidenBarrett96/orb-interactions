import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { FC } from "react";
import { OrbProvider } from "../components/orb/orbContext";
import { PageWrapper } from "../components/layout/pageWrapper";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <PageWrapper>
        <OrbProvider>
          <Component {...pageProps} />
        </OrbProvider>
      </PageWrapper>
    </ChakraProvider>
  );
};

export default App;
