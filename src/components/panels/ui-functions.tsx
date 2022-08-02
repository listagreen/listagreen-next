import {
  Button,
  Center,
  CircularProgress,
  Divider,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { Field, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { api } from "../../services/api";

export function AdminFunctions() {
  return (
    <Link href="#">
      <Button
        role="group"
        backgroundColor="white"
        color="gray.500"
        size="sm"
        mr={2}
        boxShadow="xs"
        _hover={{ backgroundColor: "listagreen.basegreen", color: "white" }}
      >
        <Text
          fontSize="sm"
          color="gray.300"
          _groupHover={{ color: "listagreen.glowgreen" }}
        >
          [admin]
        </Text>
      </Button>
    </Link>
  );
}

export function FirstRegistration({ ...props }: { props?: any }) {
  const { userData } = props;
  const [isCheckingUsername, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState("");
  const [isTaken, setIsTaken] = useState(false);
  const checkUsername = useDebounce(validateUsername, 750);
  const router = useRouter();

  async function validateUsername(username: string) {
    if (username.length > 0 && username != lastCheck) {
      setIsChecking(true);
      setLastCheck(username);
      setIsTaken(false);

      await api
        .get(`/api/users/check/${username}`)
        .then((response: AxiosResponse) => {
          if (!response.data) {
            //Username disponível
            const button = document.querySelector("#submitButton");
            button.removeAttribute("disabled");
            const usernameForm = document.querySelector("#username");
            usernameForm.removeAttribute("aria-invalid");
          } else {
            //Username já existe
            setIsTaken(true);
            const button = document.querySelector("#submitButton");
            button.setAttribute("disabled", "disabled");
            const usernameForm = document.querySelector("#username");
            usernameForm.setAttribute("aria-invalid", "true");
          }
          setIsChecking(false);
        })
        .catch((error: AxiosError) => {});
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        console.log("Preencha o formulário para continuar.");
      }}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent p="2rem 1rem">
        <ModalHeader>
          <Center>
            <Stack direction={"column"} alignItems="center">
              <Img
                src="/assets/ui/logo-icon-basegreen.svg"
                alt="logo"
                w={"3.1rem"}
                zIndex="14"
              />
              <Text color="listagreen.basegreen" fontSize="sm">
                Bem-vindo(a)!
              </Text>
              <Text color="gray.700" fontSize="lg" lineHeight="0.9rem">
                Vamos completar o seu perfil.
              </Text>
            </Stack>
          </Center>
        </ModalHeader>
        <ModalBody>
          <Divider mb="4" borderColor="gray.300" />
          <VStack spacing="8">
            <Formik
              initialValues={{ name: "", surname: "", username: "" }}
              onSubmit={(values, actions) => {
                setIsChecking(true);
                const id = userData.userid;
                const { name, surname, username } = values;
                const main_name = name.split(" ")[0];

                api
                  .post("/api/users/update", {
                    id,
                    name,
                    surname,
                    main_name,
                    username,
                  })
                  .then((response) => {
                    if (response.status == 200) {
                      setTimeout(() => {
                        router.reload();
                      }, 1750);
                    }
                  })
                  .catch((error: AxiosError) => {
                    setIsChecking(false);
                    setIsTaken(true);
                    setIsChecking(false);
                    console.log("Nome de usuário já está em uso");
                  });
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Stack direction={"row"} alignItems="center" mt={4}>
                    <Image
                      src="https://img.icons8.com/windows/32/07d0bd/username.png"
                      alt=""
                      w={"2rem"}
                      h={"2rem"}
                    />
                    <Input
                      type="text"
                      id="name-form"
                      size="lg"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      name="name"
                      placeholder="Seu nome"
                      focusBorderColor="listagreen.basegreen"
                      required
                    />
                  </Stack>
                  <Stack direction={"row"} alignItems="center" mt={4}>
                    <Image
                      src="https://img.icons8.com/windows/32/07d0bd/username.png"
                      alt=""
                      w={"2rem"}
                      h={"2rem"}
                    />
                    <Input
                      type="text"
                      size="lg"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.surname}
                      name="surname"
                      placeholder="Sobrenome"
                      focusBorderColor="listagreen.basegreen"
                      required
                    />
                  </Stack>
                  <Center>
                    <Text
                      m={"1.5rem 0rem -0.5rem 0rem"}
                      fontSize={"sm"}
                      fontWeight="bold"
                      color="gray.500"
                    >
                      Crie o seu nome de usuário
                    </Text>
                  </Center>
                  <Stack direction={"row"} alignItems="center" mt={4}>
                    <Image
                      src="https://img.icons8.com/pastel-glyph/64/07d0bd/name.png"
                      alt=""
                      w={"2rem"}
                      h={"2rem"}
                    />
                    <Field
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.username}
                      name="username"
                      validate={checkUsername}
                      required
                    >
                      {({ field }) => (
                        <Input
                          size="lg"
                          id="username"
                          focusBorderColor="listagreen.basegreen"
                          errorBorderColor="red.300"
                          {...field}
                        />
                      )}
                    </Field>
                  </Stack>
                  {isTaken && (
                    <Center>
                      <Text mt="1rem" color="red.300">
                        O usuário já existe.
                      </Text>
                    </Center>
                  )}
                  <Center>
                    <Tooltip
                      label="Preencha as informações corretamente."
                      shouldWrapChildren
                      hasArrow
                      mt={-4}
                    >
                      <Button
                        isDisabled
                        id="submitButton"
                        boxShadow="xl"
                        size="xl"
                        m={"1.5rem 0rem 1.5rem 0rem"}
                        fontSize="lg"
                        padding="1rem 4rem"
                        color="listagreen.basegreen"
                        type="submit"
                        _hover={{
                          bg: "listagreen.basegreen",
                          color: "white",
                        }}
                      >
                        {isCheckingUsername ? (
                          <CircularProgress
                            isIndeterminate
                            color="listagreen.basegreen"
                            size="1.35rem"
                          />
                        ) : (
                          <Text>Confirmar</Text>
                        )}
                      </Button>
                    </Tooltip>
                  </Center>
                </form>
              )}
            </Formik>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
