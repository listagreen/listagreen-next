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
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Image,
  Center,
} from '@chakra-ui/react';
import Link from 'next/link';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Bernardo Andrade',
    url: '/assets/userfiles/avatar/avatar-bernardoandrade.jpg',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];

export default function loginPage() {
  return (
    <Box position={"relative"}>
      <Center h='100px'>
      <Image
        boxSize='36'
        alt='Listagreen logo'
        src={"/assets/ui/listagreen-logo-darkgreen.svg"}
      />
      </Center>
      
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Encontre e organize o mundo{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, listagreen.basegreen,listagreen.lightgreen)"
              bgClip="text"
            >
              sustentável.
            </Text>{" "}          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-r, listagreen.basegreen,listagreen.lightgreen)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }} color="gray.300">
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontWeight= {"bold"}
              fontSize={{ base: "sm", md: "sm" }}
              bg={"white"}
              color={"listagreen.basegreen"}
              rounded={"full"}
              width={useBreakpointValue({ base: "44px", md: "60px" })}
              height={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-r, listagreen.basegreen,listagreen.lightgreen)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              VOCÊ
            </Flex>
          </Stack>
        </Stack>
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
              Bem-vindo(a) de volta.
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Acesse a sua listagreen.
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Seu e-mail"
                bg={"gray.100"}
                focusBorderColor="listagreen.basegreen"
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                placeholder="Senha"
                type="password"
                bg={"gray.100"}
                focusBorderColor="listagreen.basegreen"
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />

              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, listagreen.basegreen,listagreen.lightgreen)"
                color={"white"}
                transitionDuration="200ms"
                _hover={{
                  bgGradient:
                    "linear(to-r, listagreen.lightgreen, listagreen.glowgreen)",
                  boxShadow: "xl",
                }}
              >
                Entrar
              </Button>
            </Stack>
            <Text
              w={"full"}
              color={"gray.500"}
              fontSize={{ base: "sm", sm: "md" }}
              textAlign={["center"]}
              lineHeight={2.1}
            >
              ou
            </Text>
            <Button
              fontFamily={"heading"}
              bg={"gray.200"}
              color={"gray.800"}
              w={"full"}
              fontSize={{ base: "sm", sm: "sm" }}
              _hover={{
                bg: "gray.300",
                color: "white",
                boxShadow: "xl",
              }}
            >
              <Image
                boxSize="21px"
                m={2}
                src="https://img.icons8.com/fluency/48/undefined/google-logo.png"
                alt="Google icon"
              />{" "}
              Entrar com Google
            </Button>
            <Stack align={'center'} mt={"5"}>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }} >
              Ainda não tem conta?{" "}
            </Text>
              <Text color={"listagreen.basegreen"} fontSize={{ base: "sm", sm: "md" }} fontWeight="bold">
              <Link href="/novaconta">Registre-se.</Link>
              </Text> 
            </Stack>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(92px)" }}
      />
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#07D0BD" />
      <circle cx="244" cy="106" r="139" fill="#07D0BD50" />
      <circle cy="291" r="139" fill="#00FFC2" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#00FFC2" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#00FFC230" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB7870" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#00FFC2" />
    </Icon>
  );
};