"use client";

import { Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "src/components/header";
import Preloader from "src/components/title/preloader";
import EthConverter from "src/components/eth-converter";
import Navbar from "src/components/navbar";

const Page = () => {
  const [preloaded, setPreloaded] = useState(false as boolean);

  useEffect(() => {
    setTimeout(() => {
      setPreloaded(true);
    }, 2000);
  }, []);

  const feature = () => {
    return (
      <>
        <Navbar />
        <Center>
          <Box
            mt={10}
            px={5}
            maxW="1300px"
            w="100%"
            style={{
              animation: preloaded ? "fadeIn 1s ease-in-out" : "none",
            }}
          >
             <Header />
            <EthConverter
            />
          </Box>
        </Center>
      </>
    );
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>

      {!preloaded ? (
        <>
          <Navbar />
          <Preloader />
        </>
      ) : (
        feature()
      )}
    </>
  );
};

export default Page;
