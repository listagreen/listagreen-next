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
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { Input } from "../components/forms/input";
import { api } from "../services/api";

const toLogin = () => {
  const router = useRouter();
  router.push("/api/auth/login");
};

export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState();
  const [isComplete, setIsVerified] = useState(false);

  const fetchUser = useCallback(async () => {
    //Buscar usuário com token auth0id
    const data = await fetch(`/api/users/${user.sub}`);
    const userInfo = await data.json();
    userInfo && setUserData(userInfo);
    if (userInfo?.state == "INCOMPLETE") {
      setIsVerified(false);
    } else {
      setIsVerified(true);
    }

    if (!userInfo) {
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
        //console.log(registerInfo);
      })();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      //Buscar no mongoDB caso exista token Auth0
      fetchUser();
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      main_name: "",
      username: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      surname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const { id } = userData;
      //console.log(id);
      const { name, surname, username } = values;
      const main_name = name.split(" ")[0];

      api.post("/api/users/update", {
        id,
        name,
        surname,
        main_name,
        username,
      });

      onClose();
    },
  });

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
      {user ? (
        isComplete ? (
          //Rodar interface normal (usuário logado e completo)
          <div>
            <p>{JSON.stringify(userData)}</p>
          </div>
        ) : (
          <>
            <Center>
              <Button
                mt="10"
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
              <ModalContent as="form" onSubmit={formik.handleSubmit}>
                <ModalHeader>Cadastro de perfil</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Divider my="6" borderColor="green.700" />
                  <VStack spacing="8">
                    <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                      <Input
                        name="name"
                        type="text"
                        label="Nome"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      <Input
                        name="surname"
                        type="text"
                        label="Sobrenome"
                        onChange={formik.handleChange}
                        value={formik.values.surname}
                      />
                      <Input
                        name="username"
                        type="text"
                        label="Nome de usuário"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                    </SimpleGrid>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                      <Button onClick={onClose}>Voltar</Button>
                      <Button colorScheme="green" type="submit">
                        Enviar
                      </Button>
                    </HStack>
                  </Flex>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      ) : (
        //Redirect para login
        toLogin()
      )}
    </>
  );
}
