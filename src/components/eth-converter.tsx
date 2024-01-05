import React, { useState } from "react";
import { Container, Flex, Text, Input, useToast } from "@chakra-ui/react";
import BigNumber from "bignumber.js";

BigNumber.config({ DECIMAL_PLACES: 30 });

interface UnitsType {
  units: { [key: string]: string };
  convert: (value: string, from: string, to: string) => string;
}

const rawUnits = {
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

const Units: UnitsType = {
  units: rawUnits,

  convert(value, from, to) {
    return units[from].times(value).dividedBy(units[to]).toString(10);
  },
};

const UnitsConverter = () => {
  const [data, setData] = useState<{ [key: string]: string | null }>(
    Object.fromEntries(Object.keys(rawUnits).map((key) => [key, null]))
  );

  const toast = useToast();

  const handleOnChange = (value: string, name: string) => {
    if (value === null || value.trim() === "") {
      // Clear all fields to default values if the value is null or empty
      setData(
        Object.fromEntries(Object.keys(rawUnits).map((key) => [key, null]))
      );
      return;
    }

    if (!re.test(value)) {
      toast({
        title: "Invalid input.",
        description: "Please enter a valid number.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const newData = { ...data, [name]: value };
    setData(newData);
    updateConversion(name, value);
  };

  const updateConversion = (source: string, valNum: string) => {
    const updatedData = { ...data };

    Object.keys(updatedData).forEach((unit) => {
      if (unit !== source) {
        try {
          updatedData[unit] = Units.convert(valNum, source, unit);
          updatedData[source] = valNum;
        } catch (error) {
          console.error(error);
          toast({
            title: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }
    });

    setData(updatedData);
  };

  return (
    <Container maxW="container.sm" mt="2rem">
      <Flex justify="center" direction="column">
        {Object.entries(data).map(([name, value], index) => (
          <Flex key={index} justify="center" alignItems="center" mt="1rem">
            <Text color="#4299E1" align="left" w="5rem" mr="1rem">
              {name}
            </Text>
            <Input
              type="number"
              value={value === null ? "" : value}
              onChange={(e) => handleOnChange(e.target.value, name)}
            />
          </Flex>
        ))}
      </Flex>
    </Container>
  );
};

export default UnitsConverter;
