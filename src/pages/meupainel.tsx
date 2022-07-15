import { useUser } from "@auth0/nextjs-auth0";
import {
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../components/forms/input";

const toLogin = () => {
  const router = useRouter()
  router.push('/api/auth/login')
}

export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ userData, setUserData] = useState()
  const [ isComplete, setIsVerified ] = useState(false)

  const fetchUser = useCallback(async () => {
    //Buscar usuário com token auth0id
    const data = await fetch(`/api/users/${user.sub}`);
    const userInfo = await data.json();
    userInfo && setUserData(userInfo);
    if(userInfo?.state == "INCOMPLETE"){
      setIsVerified(false);
    } else {
      setIsVerified(true);
    }


    if (!userInfo) {
      //Criar usuário caso não encontrado
      (async () => {
        const headers = new Headers();
        const register = await fetch("api/users/register",  {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            email: user.email,
            auth0id: user.sub,
            avatar: user.picture,
          })
          })
        const registerInfo = await register.json();
        //console.log(registerInfo);
      })();
    }
    
  }, [user])

  useEffect(() => {
    if (user) {
      //Buscar no mongoDB caso exista token Auth0  
      fetchUser();
    }
  }, [user]);

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;


  return (
    <>
      { user ? isComplete? (
        //Rodar interface normal (usuário logado e completo)
          <div>
            <p>{JSON.stringify(userData)}</p>
          </div>
      ) : (
        <>
          <Center>
            <Button mt="10"
              onClick={() => {
                setOverlay(<OverlayOne />);
                onOpen();
              }}
            >
              Open Modal
            </Button>
          </Center>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Cadastro de perfil</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Divider my="6" borderColor="green.700" />
                <VStack spacing="8">
                  <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                    <Input name="name" type="text" label="Nome" />
                    <Input name="surname" type="text" label="Sobrenome" />
                    <Input
                      name="main-name"
                      type="text"
                      label="Nome principal"
                    />
                    <Input
                      name="username"
                      type="text"
                      label="Nome de usuário"
                    />
                  </SimpleGrid>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Flex mt="8" justify="flex-end">
                  <HStack spacing="4">
                    <Button onClick={onClose}>Voltar</Button>
                    <Button colorScheme="green">Enviar</Button>
                  </HStack>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) :
      //Redirect para login
      toLogin()

      }
    </>
  );
}

