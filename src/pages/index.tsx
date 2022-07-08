import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Icon,
  Link as ChackraLink,
  Img,
  Center,
  Heading,
  Input,
  CircularProgress,
  Divider,
} from "@chakra-ui/react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Link from "next/link";
import TopNav from "../components/ui-blocks/topnavbar";
import SearchBar from "../components/ui-blocks/searchbar";

export default function Initial() {
  const SliderProperties = {
    duration: 4500,
    autoplay: true,
    indicators: false,
    infinite: true,
    arrows: false,
    defaultIndex: 1,
    pauseOnHover: false,
  };
  const sliderImages = [
    "assets/ui/slider2.webp",
    "assets/ui/slider3.webp",
    "assets/ui/slider4.webp",
    "assets/ui/slider5.webp",
  ];
  const slideStyle = {
    width: "100vw", backgroundSize: "cover", height: "35rem",
  };

  return (
    <Flex
    direction="column"
    justify="space-between"
    >

      <TopNav />
      <Box className="header-container"
      overflow={"hidden"}
      maxHeight={"35rem"}
      mb="1rem"
      flex="1"
      >

      <Center className="title-container"
      zIndex={70}
      position="relative"
      top="14rem"
      h={0}
      >
          <Stack
          direction="column"
          textAlign={'center'}
          >
            <Heading
          fontWeight={600}
          fontSize={{ base: '1xl', sm: '1xl', md: '2xl' }}
          lineHeight={'110%'}
          color={'#555555d1'}
          >
            SEU NOVO HUB DE
          </Heading>
          <Stack
          direction="column"
          textAlign={'center'}
          >
          <Heading
          margin={'auto'}
          mb={'-1.35rem'}
          width="fit-content"
          fontWeight={700}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          lineHeight={'110%'}
          color={'white'}
          backgroundColor={'listagreen.darkgreen'}
          borderRadius="1rem 1rem 0 0"
          p={'0.7rem'}
          >
            INFORMAÇÕES E
          </Heading>
          <Heading
          fontWeight={700}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          lineHeight={'110%'}
          color={'white'}
          backgroundColor={'listagreen.darkgreen'}
          borderRadius="1rem"
          p={'0.7rem'}
          >
            SUSTENTABILIDADE
          </Heading>
          </Stack>
          </Stack>

      </Center>

      <Fade className="slider"
      backgroundColor={'listagreen.darkgreen'}
      {...SliderProperties}>
        
        {sliderImages.map((image, index) => (
          <div className="each-fade">
          <div style={{...slideStyle, backgroundImage: `url(${sliderImages[index]})`}} />
          </div>
        ))}
        
      </Fade>

      <Center className="searchbar-container"
      backgroundColor={'#00000070'}
      h={'9rem'}
      p={'1rem'}
      position={'relative'}
      top={'-9rem'}
      zIndex={'70'}
      >
        <SearchBar />

      </Center>

      </Box>

      <Box className="content-container" m={"1rem 0rem"} flex={1} >
        <Center>
        <CircularProgress isIndeterminate color='listagreen.basegreen' />
        </Center>
      </Box>

      <Box className="footer-container" mt={"3.5rem"} flex={1}>
        <Divider />
        <Flex
        mt={'-1.5rem'}
        mb={'1.5rem'}
        w="full"
        h={'5rem'}
        align="center"
        justify="center"
        px="6"
        py="4"
        >
          <Stack direction={"column"}>
            <Center>
            <Img src="/assets/ui/logo-icon-basegreen.svg" alt="logo" w={"3.1rem"} zIndex="14" />
            </Center>
            <Stack direction={"row"}>
              <Text fontSize={"sm"} fontWeight="bold" color="gray.500">Listagreen ® 2022</Text><Text fontSize={"sm"} > - Todos os direitos reservados.</Text>
            </Stack>
          </Stack>
        </Flex>
      </Box>

    </Flex>
  );
}
