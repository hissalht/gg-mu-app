import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useCharacters } from "../api/characters";

export default function SiteHeader() {
  const {
    isOpen: isMenuOpen,
    onToggle: toggleMenu,
    onClose: closeMenu,
  } = useDisclosure();

  const { data } = useCharacters();

  const location = useLocation();
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <>
      <Box as="header" padding="2">
        <IconButton
          icon={<HamburgerIcon />}
          size="lg"
          aria-label={(isMenuOpen ? "Close" : "Open") + " navigation menu."}
          onClick={toggleMenu}
        />
      </Box>
      <Drawer isOpen={isMenuOpen} onClose={closeMenu}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <nav>
              {data && (
                <ul>
                  {data.map((character) => (
                    <li key={character.id}>
                      <Link
                        as={RouterLink}
                        to={"/characters/" + character.slug}
                      >
                        {character.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
