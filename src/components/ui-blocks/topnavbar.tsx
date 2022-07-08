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
  } from "@chakra-ui/react";
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from "@chakra-ui/icons";
  import "react-slideshow-image/dist/styles.css";
  import Link from "next/link";


export default function TopNav() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Flex
            className="top-nav"
            zIndex = {'100'}
            position="relative"
            boxShadow ='lg'
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("gray.600", "white")}
            minH={"77px"}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.900")}
            align={"center"}
          >
            <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex>
            <Flex ps={11} flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Img src="/assets/ui/logo-darkgreen.svg" alt="logo" />
    
              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <DesktopNav />
              </Flex>
            </Flex>
    
            <Stack
            className="nav-options"
            direction="column"
            >
              <Stack
              pe={11}
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button
                mr={"2"}
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/api/auth/login"}
              >
                Comece agora  
                <Icon
                color={"listagreen.darkgreen"}
                w={3}
                h={3}
                as={ChevronRightIcon}
                position={'relative'}
                top={'2px'}
              />
              </Button>
              <Button
                fontFamily={"heading"}
                fontSize={"md"}
                mt={8}
                w={"full"}
                h={"2.7em"}
                bgGradient="linear(to-r, listagreen.basegreen,listagreen.lightgreen)"
                color={"white"}
                transitionDuration="200ms"
                _hover={{
                  bgGradient:
                    "linear(to-r, listagreen.lightgreen, listagreen.glowgreen)",
                  boxShadow: "xl",
                }}
              >
                <Link href="/api/auth/login">Criar minha lista</Link>
              </Button>
            </Stack>
            <Collapse in={isOpen} animateOpacity>
            <MobileNav />
            </Collapse>
            </Stack>
          </Flex>
      );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("listagreen.darkgreen", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");
  
    return (
      <Stack direction={"row"} spacing={4} align={"center"} paddingStart={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <ChackraLink
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                  >
                    {navItem.label}
                    {navItem.children && (
                        <Icon
                        as={ChevronDownIcon}
                        w={4}
                        h={4}
                        />
                    )}
                    
                </ChackraLink>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ icon, label, href, subLabel }: NavItem) => {
    return (
      <ChackraLink
        href={href}
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("listagreen.bggreen", "gray.900") }}
      >
        <Stack direction={"row"}>
          <Flex
            transition={"all .3s ease"}
            opacity={"100%"}
            _groupHover={{ opacity: "92%"}}
            justify={"flex-start"}
            align={"center"}
            flex={1}
          >
            <Img
              w={'2.7rem'}
              mr={1}
              p={1}
              src={icon}
            />
          </Flex>
          <Flex
          flex={5}
          justify={"flex-start"}
          >
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "listagreen.darkgreen" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          </Flex>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon
              color={"listagreen.darkgreen"}
              w={5}
              h={5}
              as={ChevronRightIcon}
            />
          </Flex>
        </Stack>
      </ChackraLink>
    );
  };
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={ChackraLink}
          href={href ?? "#"}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            align={"start"}
          >
            {children &&
              children.map((child) => (
                <ChackraLink key={child.label} py={2} href={child.href}>
                  {child.label}
                </ChackraLink>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  
  interface NavItem {
    icon: string;
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
  }

  const NAV_ITEMS: Array<NavItem> = [
    {
      icon: "",
      label: "Inspire-se",
      children: [
        {
          icon: "../../assets/ui/icon-ecofriendly.png",
          label: "Explore o mundo sustentável",
          subLabel: "Tendências e informações relevantes",
          href: "#",
        },
        {
          icon: "../../assets/ui/logo-icon-basegreen.svg",
          label: "Siga a Listagreen",
          subLabel: "Acompanhe nossas redes sociais",
          href: "#",
        },
      ],
    },
    {
      icon: "",
      label: "Descubra",
      children: [
        {
          icon: "../../assets/ui/icon-marketplaces.png",
          label: "Produtos sustentáveis",
          subLabel: "Em marketplaces",
          href: "#",
        },
        {
          icon: "../../assets/ui/icon-professionals.png",
          label: "Profissionais em sua área",
          subLabel: "Especializados",
          href: "#",
        },
      ],
    },
    {
      icon: "",
      label: "Sobre a Listagreen",
      href: "#",
    },
  ];
  
