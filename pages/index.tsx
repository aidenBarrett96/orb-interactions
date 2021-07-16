import { Box, Center } from "@chakra-ui/react";
import { FC } from "react";
import { HintBox } from "../components/hintBox";

const HomePage: FC = () => {
  return (
    <Box>
      <Center h="100vh" py="100vh">
        <HintBox />
      </Center>
    </Box>
  );
};

export default HomePage;
