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

interface MainLinkItemProps {
  name: string;
  href: string;
  icon: IconType;
}
const MainLinkItems: Array<MainLinkItemProps> = [
  { name: 'Listagreen', href: '/meupainel', icon: FiGrid },
  { name: 'Descobrir', href: '/descobrir', icon: FiCompass },
  { name: 'Conquistas', href: '/conquistas', icon: FiAward },
];

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Listas', icon: FiFileText },
  { name: 'Posts', icon: FiClipboard },
  { name: 'Recomendações', icon: FiStar },
  { name: 'Green Points', icon: FiAward },
  { name: 'Negócios', icon: FiShoppingBag },
  { name: 'Aumentar alcance', icon: FiTrendingUp },
  { name: 'Insights', icon: FiGrid },
  { name: 'Torne-se um Patrono', icon: FiSmile },
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
    <Box minH="100vh" bg="#F5F5F5">
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
      
      {/* mobilenav */}
      <TopBarNav  onOpen={onOpen} {...userData}/>

      {/* Content */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      boxShadow='xl'
      transition="2s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: "11rem" }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
      <Image src='../../assets/ui/logo-darkgreen.svg' alt="logo" w={"sm"} m={"1rem"}/>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

        {MainLinkItems.map((link) => (
          <MainNavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </MainNavItem>
        ))}

      <Divider w="77%" m="1rem auto" borderColor="gray.300"/>

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}
        _hover={{
          background: "gray.100",
          transition: "0.5s ease",
        }}>
          {link.name}
        </NavItem>
      ))}
    </Box>
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
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
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