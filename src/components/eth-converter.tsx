import React, { useState } from "react";
import { Box, Flex, Text, Input, useToast } from "@chakra-ui/react";
import BigNumber from "bignumber.js";

BigNumber.config({ DECIMAL_PLACES: 30 });

const rawUnits: { [key: string]: string } = {
  wei: "1",
  kwei: "1000",
  mwei: "1000000",
  gwei: "1000000000",
  szabo: "1000000000000",
  finney: "1000000000000000",
  ether: "1000000000000000000",
};

const units: { [key: string]: BigNumber } = {};
Object.keys(rawUnits).forEach((unit) => {
  units[unit] = new BigNumber(rawUnits[unit], 10);
});

const re = /^[0-9]+\.?[0-9]*$/;

const convert = (value: string, from: string, to: string) => {
  return units[from].times(value).dividedBy(units[to]).toString(10);
};

const unitDescriptions: { [key: string]: string } = {
  wei: "smallest unit",
  kwei: "10\u00B3 wei",
  mwei: "10\u2076 wei",
  gwei: "gas prices",
  szabo: "10\u00B9\u00B2 wei",
  finney: "10\u00B9\u2075 wei",
  ether: "main unit",
};

const UnitsConverter = () => {
  const [data, setData] = useState<{ [key: string]: string | null }>(
    Object.fromEntries(Object.keys(rawUnits).map((key) => [key, null]))
  );
  const [activeField, setActiveField] = useState<string | null>(null);

  const toast = useToast();

  const handleOnChange = (value: string, name: string) => {
    if (value === null || value.trim() === "") {
      setData(
        Object.fromEntries(Object.keys(rawUnits).map((key) => [key, null]))
      );
      return;
    }

    if (!re.test(value)) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid number.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const updatedData: { [key: string]: string | null } = {};
    Object.keys(rawUnits).forEach((unit) => {
      if (unit === name) {
        updatedData[unit] = value;
      } else {
        try {
          updatedData[unit] = convert(value, name, unit);
        } catch {
          updatedData[unit] = null;
        }
      }
    });

    setData(updatedData);
  };

  return (
    <Box
      w="100%"
      maxW="480px"
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)"
      overflow="hidden"
    >
      {Object.entries(data).map(([name, value], index) => {
        const isActive = activeField === name;
        const hasValue = value !== null && value !== "";
        return (
          <Flex
            key={name}
            align="center"
            px={5}
            py={3}
            borderBottom={
              index < Object.keys(data).length - 1 ? "1px solid" : "none"
            }
            borderColor="gray.100"
            bg={isActive ? "gray.50" : "white"}
            transition="background 0.15s ease"
            _hover={{ bg: "gray.50" }}
          >
            <Box w="90px" flexShrink={0}>
              <Text
                fontSize="sm"
                fontWeight="600"
                color={hasValue ? "teal.600" : "gray.700"}
                fontFamily="mono"
                transition="color 0.15s ease"
              >
                {name}
              </Text>
              <Text fontSize="xs" color="gray.400" mt={-0.5}>
                {unitDescriptions[name]}
              </Text>
            </Box>
            <Input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={value === null ? "" : value}
              onChange={(e) => handleOnChange(e.target.value, name)}
              onFocus={() => setActiveField(name)}
              onBlur={() => setActiveField(null)}
              variant="unstyled"
              fontSize="sm"
              fontFamily="mono"
              color="gray.800"
              _placeholder={{ color: "gray.300" }}
              textAlign="right"
            />
          </Flex>
        );
      })}
    </Box>
  );
};

export default UnitsConverter;
