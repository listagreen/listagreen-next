import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Image,
    Center,
  } from '@chakra-ui/react';
  import Link from 'next/link';
  import { materialInput as MaterialInput} from '../components/ui-blocks/MaterialUI';
  import {lgBar as LgBar} from '../components/ui-blocks/header';

  export default function newAccount() {
    return (
      <Box position={"relative"} bg={"gray.100"} h='calc(100vh)'>
        <LgBar />      
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={1}
          spacing={{ base: 10, lg: 31 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Center>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "4xl", lg: "4xl" }}
              mb={"1em"}
            >
              Um mundo sustentável espera{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, listagreen.basegreen,listagreen.lightgreen)"
                bgClip="text"
              >
                por você.
              </Text>{" "}
            </Heading>
          </Center>
          <Center>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.500"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "3xl" }}
              >
                Crie sua conta
              </Heading>
              <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                Preencha os campos abaixo para criar sua nova conta.
              </Text>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Stack direction={'row'}>
                    <MaterialInput
                    name="name"
                    label="Seu nome"
                    type="text"
                    value=""
                    changeHandler={() => {}}
                    />
                    <MaterialInput
                    name="surname"
                    label="Sobrenome"
                    type="text"
                    value=""
                    changeHandler={() => {}}
                    />
                </Stack>
                <MaterialInput
                    name="email"
                    label="E-mail"
                    type="text"
                    value=""
                    changeHandler={() => {}}
                />
                <MaterialInput
                    name="username"
                    label="Nome de usuário"
                    type="text"
                    value=""
                    changeHandler={() => {}}
                />
                <Stack direction={'row'}>
                <MaterialInput
                    name="password"
                    label="Crie uma senha"
                    type="password"
                    value=""
                    changeHandler={() => {}}
                />
                <MaterialInput
                    name="password"
                    label="Confirme a senha"
                    type="password"
                    value=""
                    changeHandler={() => {}}
                />
                </Stack>
  
                <Button
                  fontFamily={"heading"}
                  fontSize={"lg"}
                  mt={8}
                  w={"full"}
                  h={"3.5em"}
                  bgGradient="linear(to-r, listagreen.basegreen,listagreen.lightgreen)"
                  color={"white"}
                  transitionDuration="200ms"
                  _hover={{
                    bgGradient:
                      "linear(to-r, listagreen.lightgreen, listagreen.glowgreen)",
                    boxShadow: "xl",
                  }}
                >
                  Continuar
                </Button>
              </Stack>
              
            </Box>
          </Stack>
          </Center>
        </Container>
      </Box>
    );
  }
  