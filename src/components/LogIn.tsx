import { Button, Flex, Input } from "@chakra-ui/react";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        onSubmit={handleSubmit}
        w="100%"
        maxW={360}
        flexDir="column"
      >
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          focusBorderColor="green.500"
          bgColor="gray.100"
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          focusBorderColor="green.500"
          bgColor="gray.100"
        />
        <Button type="submit" mt="6" colorScheme="green">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
