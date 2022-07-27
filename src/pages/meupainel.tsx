import { useUser } from "@auth0/nextjs-auth0";
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
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
            <Text>Conteúdo</Text>

          ) : (
            //Rodar interface de completar cadastro (mongoDB)
            <FirstRegistration {...{ userData }}/>
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
