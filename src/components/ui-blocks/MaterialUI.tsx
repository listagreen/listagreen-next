
import React, { useState, useRef } from "react";
import { Input, Box, Text } from "@chakra-ui/react";

export function materialInput({
  name,
  type,
  label,
  value,
  changeHandler,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(!!value);
  const [textFocused, setTextFocused] = useState(false);
  const inputRef = useRef(null);

  const toggleFocus = () => {
    if (!value) {
      setIsFocused(!isFocused);
    }
    setTextFocused(!textFocused);
  };

 return (
    <Box position="relative" w="100%">
      <Text
        transition="0.2s ease all"
        position="absolute"
        left={isFocused ? "3" : "4"}
        top={isFocused ? "-9px" : "3"}
        fontSize={isFocused ? ".8rem" : "1rem"}
        bg="gray.50"
        color={isFocused ? "gray.500" : "gray.500"}
        px=".3rem"
        zIndex={1000}
        onClick={() => inputRef.current.focus()}
        borderRadius="2xl"
      >
        {label}
      </Text>
      <Input
        ref={inputRef}
        onFocus={() => toggleFocus()}
        onBlur={() => toggleFocus()}
        value={value}
        name={name}
        size="lg"
        type={type}
        color="gray.500"
        bg="gray.50"
        borderColor="gray.300"
        focusBorderColor="listagreen.basegreen"
        {...props}
      />
    </Box>
  );
}