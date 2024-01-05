import { Flex, Text, Button, Box } from "@chakra-ui/react";
import {
  featureName,
  featureSubtitle,
  githubUrl,
  mobileFeatureName,
} from "config";

import { useWindowSize } from "usehooks-ts";

const Header = () => {
  const { width } = useWindowSize();

  return (
    <>
      <Flex
        mt={10}
        mx="auto"
        maxW="7xl"
        fontSize="3xl"
        fontWeight="bold"
        color="white"
        justify="space-between"
        align="center"
      >
        <Text>{width < 450 ? mobileFeatureName : featureName}</Text>

        {width > 500 ? (
          <Flex align="center">
            <Button
              size="sm"
              variant={"outline"}
              onClick={() => {
                window.open(githubUrl, "_blank");
              }}
              fontSize="xs"
              ml={2}
            >
              Star Repository
            </Button>
          </Flex>
        ) : (
          // star icon
          <Box 
          cursor="pointer"
          onClick={() => {
            window.open(githubUrl, "_blank");
          }}
          >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star cursor-pointer" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"

          
          >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </svg>
        </Box>
        )}
      </Flex>

      <Flex
        mx="auto"
        maxW="7xl"
        borderBottom="1px"
        pb={4}
        fontSize="lg"
        justify="space-between"
      >
        <Text color="#4299E1">{featureSubtitle}</Text>
      </Flex>
    </>
  );
};

export default Header;
