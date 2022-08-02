import { useUser } from "@auth0/nextjs-auth0";
import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Img,
  Input,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  Flex,
  useColorModeValue,
  IconButton,
  Box,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";
import { FiX, FiPlus} from "react-icons/fi";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import SidebarWithHeader from "../components/ui-blocks/dashboard";
import { FirstRegistration } from "../components/panels/ui-functions";

const toLogin = () => {
  const router = useRouter();
  router.push("/api/auth/login");
};

export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  const [userData, setUserData] = useState();
  const [isComplete, setIsComplete] = useState(false);

  const fetchUser = useCallback(async () => {
    //Buscar usuário com token auth0id
    const data = await fetch(`/api/users/${user.sub}`);
    const userInfo = await data.json();
    userInfo && setUserData(userInfo);

    if (userInfo.state == "ACTIVE") {
      setIsComplete(true);
    }

    if (userInfo == null || userInfo.email != user.email) {
      //Criar usuário caso não encontrado
      (async () => {
        const headers = new Headers();
        const register = await fetch("api/users/register", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            email: user.email,
            auth0id: user.sub,
            avatar: user.picture,
          }),
        });
        const registerInfo = await register.json();
        if (registerInfo) {
          let firstUserData = {
            userid: registerInfo.id,
            email: registerInfo.email,
            state: registerInfo.state,
          };
          setUserData(firstUserData);
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    document.title = "Meu painel | Listagreen";
    if (user && !userData) {
      //Buscar no mongoDB caso exista token Auth0
      fetchUser();
    }
  }, [user]);

  if (isLoading)
    return (
      <Center h={"100vh"}>
        {" "}
        <CircularProgress
          m="7"
          isIndeterminate
          color="listagreen.basegreen"
        />{" "}
      </Center>
    );

  if (!user) {
    //Redirect para login
    toLogin();
  }

  if (error) return <div>{error.message}</div>;

  return (
    <>
      {userData ? (
        <SidebarWithHeader {...{ userData }}>
          {isComplete ? (
            //Rodar interface normal (usuário logado e completo)
            <>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Minha conta
              </Heading>
              <Stack direction={["column", "row"]} w={"100%"}>
                <Box id="userinfo_div">
                  <Stack
                    spacing={4}
                    w={"100%"}
                    maxW={"full"}
                    bg="white"
                    rounded={"xl"}
                    boxShadow={"lg"}
                    p={6}
                    mx={4}
                    my={11}
                  >
                    <FormControl id="userName">
                      <FormLabel fontSize="lg" fontWeight="bold">
                        Suas informações
                      </FormLabel>
                      <Stack direction={["column", "row"]} spacing={6}>
                        <Center>
                          <Avatar
                            size="xl"
                            name={userData?.name}
                            src={userData?.avatar}
                          >
                            <AvatarBadge
                              as={IconButton}
                              size="sm"
                              rounded="full"
                              top="-10px"
                              colorScheme="red"
                              aria-label="remove Image"
                              icon={<FiX />}
                            />
                          </Avatar>
                        </Center>
                        <Center w="full">
                          <Button w="full">Enviar imagem</Button>
                        </Center>
                      </Stack>
                    </FormControl>
                    <FormControl id="userName" isRequired>
                      <FormLabel>Nome de usuário:</FormLabel>
                      <Input
                        placeholder={userData?.username}
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                      />
                    </FormControl>
                    <FormControl id="name" isRequired>
                      <FormLabel>Nome:</FormLabel>
                      <Input
                        placeholder={userData?.name}
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                      />
                    </FormControl>
                    <FormControl id="surname" isRequired>
                      <FormLabel>Sobrenome:</FormLabel>
                      <Input
                        placeholder={userData?.surname}
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                      />
                    </FormControl>
                    <FormControl id="email" isRequired>
                      <FormLabel>E-mail:</FormLabel>
                      <Input
                        disabled = {true}
                        placeholder={userData?.email}
                        _placeholder={{ color: "gray.500" }}
                        type="email"
                      />
                    </FormControl>
                    <FormControl id="date" isRequired>
                      <FormLabel>Desde:</FormLabel>
                      <Input
                        disabled = {true}
                        placeholder={new Date(userData?.since).toLocaleDateString('pt-BR')}
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                      />
                    </FormControl>
                    <Stack spacing={6} direction={["column", "row"]}>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        w="full"
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        Salvar alterações
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
                <Box id="userinterests_div">
                  <Stack
                    spacing={4}
                    w={"100%"}
                    maxW={"lg"}
                    bg="white"
                    rounded={"xl"}
                    boxShadow={"lg"}
                    p={6}
                    mx={4}
                    my={11}
                  >
                    <FormControl id="interests_tags">
                      <FormLabel fontSize="lg" fontWeight="bold">
                        Interesses
                      </FormLabel>
                    </FormControl>
                    <FormControl id="interestsTags">
                      <FormLabel>Escolhidos:</FormLabel>
                      <Tag
                        size={'lg'}
                        variant="subtle"
                        colorScheme="green"
                        cursor="pointer"
                        py={2}
                        m={"1"}
                        _hover={{
                            bg: "listagreen.basegreen",
                            color: "white",
                            transitionDuration: "0.2s",
                        }}
                      >
                        <TagLabel>Sustentabilidade</TagLabel>
                        <TagRightIcon boxSize="12px" as={FiX} />
                      </Tag>
                      <Tag
                        size={'lg'}
                        variant="subtle"
                        colorScheme="green"
                        cursor="pointer"
                        py={2}
                        m={"1"}
                        _hover={{
                            bg: "listagreen.basegreen",
                            color: "white",
                            transitionDuration: "0.2s",
                        }}
                      >
                        <TagLabel>Tecnologia Sustentável</TagLabel>
                        <TagRightIcon boxSize="12px" as={FiX} />
                      </Tag>
                      <Tag
                        size={'lg'}
                        variant="subtle"
                        colorScheme="green"
                        cursor="pointer"
                        py={2}
                        m={"1"}
                        _hover={{
                            bg: "listagreen.basegreen",
                            color: "white",
                            transitionDuration: "0.2s",
                        }}
                      >
                        <TagLabel>Construção Sustentável</TagLabel>
                        <TagRightIcon boxSize="12px" as={FiX} />
                      </Tag>
                      <Tag
                        size={'lg'}
                        variant="subtle"
                        colorScheme="gray"
                        color="gray.400"
                        cursor="pointer"
                        py={2}
                        m={"1"}
                        _hover={{
                            bg: "gray.400",
                            color: "white",
                            transitionDuration: "0.2s",
                        }}
                      >
                        <TagLeftIcon boxSize="12px" as={FiPlus} />
                        <TagLabel>Adicionar Interesse</TagLabel>
                      </Tag>
                    </FormControl>
                    <Stack spacing={6} direction={["column", "row"]}>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        w="full"
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        Salvar alterações
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </>
          ) : (
            //Rodar interface de completar cadastro (mongoDB)
            <FirstRegistration {...{ userData }} />
          )}
        </SidebarWithHeader>
      ) : (
        //Carregando...
        <Center h={"100vh"}>
          <CircularProgress
            m="7"
            isIndeterminate
            color="listagreen.basegreen"
          />
        </Center>
      )}
    </>
  );
}
