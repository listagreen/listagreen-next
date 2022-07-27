import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Stack,
  Center,
  Divider,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {
  FiClipboard,
  FiFileText,
  FiAward,
  FiCompass,
  FiSmile,
  FiTrendingUp,
  FiShoppingBag,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiGrid
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import { AdminFunctions } from '../panels/ui-functions';

interface LinkItemProps {
  name: string;
  href: string;
  icon: IconType;
}
const MainLinkItems: Array<LinkItemProps> = [
  { name: 'Listagreen', href: '/meupainel', icon: FiGrid },
  { name: 'Descobrir', href: '/descobrir', icon: FiCompass },
  { name: 'Conquistas', href: '/conquistas', icon: FiAward },
];

const LinkItems: Array<LinkItemProps> = [
  { name: 'Listas', icon: FiFileText, href: '/listas' },
  { name: 'Posts', icon: FiClipboard, href: '/posts' },
  { name: 'Recomendações', icon: FiStar, href: '/recomendacoes'},
  { name: 'Green Points', icon: FiAward, href: '/greenpoints' },
  { name: 'Negócios', icon: FiShoppingBag, href: '/negocios'},
  { name: 'Aumentar alcance', icon: FiTrendingUp, href: '/alcance' },
  { name: 'Insights', icon: FiGrid, href: '/insights'},
  { name: 'Torne-se um Patrono', icon: FiSmile, href: '/patrono' },
];

export default function SidebarWithHeader({
  children, ...props
}: {
  children: any;
  props?: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {userData} = props;
  return (
      <Grid 
      templateAreas={
      ` "sidebar topnav"
        "sidebar main"
        "sidebar footer"  `}
      gridTemplateRows={'7rem 1fr 5rem'}
      gridTemplateColumns={'11rem 1fr'}
      h='auto'
      gap='0'
      >
        <GridItem area={'sidebar'}>
          {/* Sidebar */}
          <SidebarContent
            onClose={() => onClose}
            display={{ base: 'none', md: 'block' }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full">
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
        </GridItem>
        <GridItem area={'topnav'}>
          {/* Top Navigation */}
          <TopBarNav  onOpen={onOpen} {...userData}/>
        </GridItem>
        <GridItem area={'main'}>
          {/* Content */}
          <Box ml={{ base: 0, md: "1rem" }} p="4">
            {children}
          </Box>
        </GridItem>
        <GridItem area={'footer'} borderTop="1px solid" borderColor="gray.200" display="flex" justifyContent={"center"}>
            <Image src="/assets/ui/logo-green.svg" w="5rem" alt="Logo" />
        </GridItem>
      </Grid>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Flex
      boxShadow='xl'
      transition="2s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: "11rem" }}
      minH="100vh"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
      <Image src='../../assets/ui/logo-darkgreen.svg' alt="logo" m={"1rem"} width={{ base: "sm", md: "sm", sm: "7rem"}}/>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      
      <Box display={{ base: 'block', md: 'block', sm:"none" }}>
        {MainLinkItems.map((link) => (
          <MainNavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </MainNavItem>
        ))}

        <Divider w="77%" m="1rem auto" borderColor="gray.300"/>
      </Box>

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}
        _hover={{
          background: "gray.100",
          transition: "0.5s ease",
        }}>
          {link.name}
        </NavItem>
      ))}
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: any;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
          <VStack
          spacing={1}
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          color="gray.500"
          {...rest}>

            {icon && (
              <Icon
                fontSize="16"
                as={icon}
              />
            )}
          <Text fontSize={"sm"}>{children}</Text>
          </VStack>
    </Link>
  );
};

interface MainNavItemProps extends FlexProps {
  icon: IconType;
  href: string
  children: any;
}
const MainNavItem = ({ icon, href, children, ...rest }: MainNavItemProps) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
          <VStack
          spacing={1}
          align="center"
          p="4"
          mx="4"
          role="group"
          borderRadius="lg"
          cursor="pointer"
          color="gray.500"
          {...rest}>

            {icon && (
              <Icon
                fontSize="3.1rem"
                padding="0.45rem"
                borderRadius="1.5rem"
                transition="0.35s ease"
                _groupHover={{
                  background: "listagreen.basegreen",
                  color: "white",
                  fontSize: "5rem",
                  padding: "1.5rem",
                  borderRadius: "2.1rem",
                  transition: "0.35s ease",
                }}
                _groupActive={{
                  background: "listagreen.basegreen",
                  color: "white",
                  fontSize: "5rem",
                  padding: "1.5rem",
                  borderRadius: "2.1rem",
                  transition: "0.35s ease",
                }}
                as={icon}
              />
            )}
          <Text fontSize={"sm"} fontWeight="500">{children}</Text>
          </VStack>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const TopBarNav = ({ onOpen, ...rest }: MobileProps) => {
  const router = useRouter();
  return (
    <Flex id="topbar"
      ml={{ base: 0, md: 0 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>

      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image display={{ base: 'flex', md: 'none' }} src='../../assets/ui/logo-darkgreen.svg' alt="logo" />

      <HStack id="topbar_menu"
      spacing={{ base: '0', md: '6' }}>

        {
          (rest?.permissions == "ADMIN" || rest?.permissions == "SUPERADMIN") && 
          <AdminFunctions />
          
        }

        <IconButton
          background="gray.200"
          borderRadius="full"
          _hover={{background:"listagreen.basegreen", color:"white"}}
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />

        <Flex id="topbar_user" alignItems={'center'}>
          <Menu>

            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-end"
                  spacing="-4px"
                  mr="2">
                  <Text fontSize="sm">
                    {rest.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {rest.username}
                  </Text>
                </VStack>
               
                <Avatar
                  size={'md'}
                  name={rest.name}
                  src={rest.avatar}
                />
                 <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>

            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Minha conta</MenuItem>
              <MenuItem>Preferências</MenuItem>
              <MenuDivider />
              <MenuItem onClick={(e) => {e.preventDefault(); router.push("/api/auth/logout")}}>Sair</MenuItem>
            </MenuList>

          </Menu>

        </Flex>

      </HStack>
    </Flex>
  );
};