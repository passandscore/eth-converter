"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import EthConverter from "src/components/eth-converter";

const Page = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      w="100%"
      px={5}
    >
      <Box mb={8} textAlign="center">
        <Text
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="600"
          color="gray.800"
          letterSpacing="-0.02em"
        >
          Eth Unit Converter
        </Text>
        <Text fontSize="md" color="gray.400" mt={1} fontWeight="400">
          wei, gwei, ether, and more
        </Text>
      </Box>

      <EthConverter />
    </Flex>
  );
};

export default Page;
