import { Flex, Text, Input, Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useState, useCallback } from "react";

const EthConverter: NextPage = () => {
  const [units, setUnits] = useState({
    wei: "",
    kwei: "",
    mwei: "",
    gwei: "",
    szabo: "",
    finney: "",
    ether: "",
  });

  function convertToWei(amount: string, unit: string) {
    const units = {
      Wei: BigInt(1),
      Kwei: BigInt(10 ** 3),
      Mwei: BigInt(10 ** 6),
      Gwei: BigInt(10 ** 9),
      Szabo: BigInt(10 ** 12),
      Finney: BigInt(10 ** 15),
      Ether: BigInt(10 ** 18),
    };

    return BigInt(amount) * units[unit];
  }

  function convertWei(amount_in_wei: bigint) {
    const units = {
      Wei: BigInt(1),
      Kwei: BigInt(10 ** 3),
      Mwei: BigInt(10 ** 6),
      Gwei: BigInt(10 ** 9),
      Szabo: BigInt(10 ** 12),
      Finney: BigInt(10 ** 15),
      Ether: BigInt(10 ** 18),
    };

    setUnits((prevUnits) => ({
      ...prevUnits,
      wei: amount_in_wei.toString(),
      kwei: (amount_in_wei / units["Kwei"]).toString(),
      mwei: (amount_in_wei / units["Mwei"]).toString(),
      gwei: (amount_in_wei / units["Gwei"]).toString(),
      szabo: (amount_in_wei / units["Szabo"]).toString(),
      finney: (amount_in_wei / units["Finney"]).toString(),
      ether: (amount_in_wei / units["Ether"]).toString(),
    }));
  }

  const handleOnChange = useCallback((value: string, unit: string) => {
    if (isNaN(Number(value))) return;

    if (value === "") {
      clearState();
      return;
    }

    const weiValue = convertToWei(value, unit);
    convertWei(weiValue);
  }, []);

  const clearState = useCallback(() => {
    setUnits({
      wei: "",
      kwei: "",
      mwei: "",
      gwei: "",
      szabo: "",
      finney: "",
      ether: "",
    });
  }, []);

  const data = [
    { name: "Wei", units: units.wei },
    { name: "Kwei", units: units.kwei },
    { name: "Mwei", units: units.mwei },
    { name: "Gwei", units: units.gwei },
    { name: "Szabo", units: units.szabo },
    { name: "Finney", units: units.finney },
    { name: "Ether", units: units.ether },
  ];

  return (
    <Container maxW="container.sm" mt="2rem">
      <Flex justify="center" direction="column">
        {data.map(({ name, units }, index) => (
          <Flex key={index} justify="center" alignItems="center" mt="1rem">
            <Text color="#4299E1" align="left" w="5rem" mr="1rem">
              {name}
            </Text>
            <Input
              type="text"
              value={units}
              onChange={(e) => handleOnChange(e.target.value, name)}
            />
          </Flex>
        ))}
      </Flex>
    </Container>
  );
};

export default EthConverter;
