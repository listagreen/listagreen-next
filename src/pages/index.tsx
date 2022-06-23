import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as ChackraLink,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Img,
  Center,
  Heading,
} from "@chakra-ui/react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Link from "next/link";
import TopNav from "../components/ui-blocks/topnavbar";

export default function Initial() {
  const SliderProperties = {
    duration: 5000,
    autoplay: true,
    indicators: false,
    infinite: true,
    arrows: false,
    defaultIndex: 2,
    pauseOnHover: false,
  };
  const sliderImages = [
    "assets/ui/slider1.webp",
    "assets/ui/slider2.webp",
    "assets/ui/slider3.webp",
  ];
  const slideStyle = {
    width: "100vw",
    backgroundSize: "cover",
    height: "35rem",
  };

  return (
    <>
      <TopNav />

      <Box className="header-container">

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
          color={'white'}
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
          backgroundColor={'listagreen.basegreen'}
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
          backgroundColor={'listagreen.basegreen'}
          borderRadius="1rem"
          p={'0.7rem'}
          >
            SUSTENTABILIDADE
          </Heading>
          </Stack>
          </Stack>

      </Center>

      <Fade className="slider"
      {...SliderProperties}>
        <div className="each-fade">
          <div style={slideStyle}>
            <img width={"100%"} src={sliderImages[0]} />
          </div>
        </div>
        <div className="each-fade">
          <div style={slideStyle}>
            <img width={"100%"} src={sliderImages[1]} />
          </div>
        </div>
        <div className="each-fade">
          <div style={slideStyle}>
            <img width={"100%"} src={sliderImages[2]} />
          </div>
        </div>
      </Fade>

      <Center className="searchbar-container"
      backgroundColor={'#00000070'}
      h={'40'}
      p={'1rem'}
      position={'relative'}
      top={'-40'}
      zIndex={'70'}
      >
        <Text>Temporary</Text>
      </Center>

      </Box>
    </>
  );
}
