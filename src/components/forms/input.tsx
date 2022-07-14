import {
    FormControl,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputPorps,
  } from "@chakra-ui/react";
  
  interface InputProps extends ChakraInputPorps {
    name: string;
    label?: string;
  }
  
  export function Input({ name, label, ...rest }: InputProps) {
    return (
      <FormControl>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraInput name={name} id={name} type="text" {...rest} />
      </FormControl>
    );
  }
  