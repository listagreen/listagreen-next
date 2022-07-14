import { Box, Flex, Text, Button, Input, Select } from "@chakra-ui/react";
import "react-slideshow-image/dist/styles.css";
import Link from "next/link";

export default function SearchBar() {

    const UF: Array<UF> = [
        { nome: "Acre", sigla: "AC" },
        { nome: "Alagoas", sigla: "AL" },
        { nome: "Amapá", sigla: "AP" },
        { nome: "Amazonas", sigla: "AM" },
        { nome: "Bahia", sigla: "BA" },
        { nome: "Ceará", sigla: "CE" },
        { nome: "Distrito Federal", sigla: "DF" },
        { nome: "Espírito Santo", sigla: "ES" },
        { nome: "Goiás", sigla: "GO" },
        { nome: "Maranhão", sigla: "MA" },
        { nome: "Mato Grosso", sigla: "MT" },
        { nome: "Mato Grosso do Sul", sigla: "MS" },
        { nome: "Minas Gerais", sigla: "MG" },
        { nome: "Pará", sigla: "PA" },
        { nome: "Paraíba", sigla: "PB" },
        { nome: "Paraná", sigla: "PR" },
        { nome: "Pernambuco", sigla: "PE" },
        { nome: "Piauí", sigla: "PI" },
        { nome: "Rio de Janeiro", sigla: "RJ" },
        { nome: "Rio Grande do Norte", sigla: "RN" },
        { nome: "Rio Grande do Sul", sigla: "RS" },
        { nome: "Rondônia", sigla: "RO" },
        { nome: "Roraima", sigla: "RR" },
        { nome: "Santa Catarina", sigla: "SC" },
        { nome: "São Paulo", sigla: "SP" },
        { nome: "Sergipe", sigla: "SE" },
        { nome: "Tocantins", sigla: "TO" },
    ];
    interface UF {
        nome: string;
        sigla: string;
    }

  return (
    <Flex
      justify={"space-between"}
      align={"center"}
      bgColor="white"
      w={{ base: "2xl", sm: "3xl", md: "4xl" }}
      p={"0.35rem"}
      borderRadius={"3.5rem"}
    >
      <Input
        fontSize="lg"
        flex="5"
        m={"0rem 0.8rem 0rem 2rem"}
        borderColor="white"
        variant="unstyled"
        placeholder="Estou buscando:"
        onFocus={(e) => {e.target.placeholder = ""}}
        onBlur={(e) => {e.target.placeholder = "Estou buscando:"}}
      />
      <Box bgColor="gray.200" w={"2px"} h={"2rem"} borderRadius={"1rem"}></Box>
      <Text
        minW={"1rem"}
        color="listagreen.darkgreen"
        fontSize="sm"
        fontWeight="bold"
        p={"0rem 0rem 0rem 0.8rem"}
      >
        Em:
      </Text>
      
      <Select
      flex="2"
      fontWeight="400"
      color="gray.500"
      m={"0rem 0.8rem"}
      variant="flushed"
      placeholder="Escolha um Estado"
      >
        {UF.map((uf) => (
            <option value={uf.sigla} key={uf.sigla}>{uf.nome}</option>
        ))}
      </Select>
      <Button
        flex="2"
        fontFamily={"heading"}
        fontSize={"lg"}
        w={"10rem"}
        h={"3rem"}
        bgGradient="linear(to-r, listagreen.basegreen,listagreen.lightgreen)"
        color={"white"}
        borderRadius={"3.5rem"}
        transitionDuration="200ms"
        _hover={{
          bgGradient:
            "linear(to-r, listagreen.lightgreen, listagreen.glowgreen)",
          boxShadow: "xl",
        }}
      >
        <Link href="#">Buscar</Link>
      </Button>
    </Flex>
  );
}
