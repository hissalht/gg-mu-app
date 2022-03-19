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
import { useNotion } from "../api";

interface CharacterResult {
  results: Array<{
    id: string;
    properties: {
      name: {
        title: Array<{ text: { content: string } }>;
      };
      slug: {
        formula: {
          string: string;
        };
      };
    };
  }>;
}

export default function SiteHeader() {
  const {
    isOpen: isMenuOpen,
    onToggle: toggleMenu,
    onClose: closeMenu,
  } = useDisclosure();

  const { data } = useNotion<CharacterResult>(
    "/databases/" + import.meta.env.VITE_CHARACTER_DB_ID + "/query",
    { method: "POST" }
  );

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
      <Drawer
        isOpen={isMenuOpen}
        onClose={closeMenu}
        size="full"
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <nav>
              {data && (
                <ul>
                  {data.results.map((character) => (
                    <li key={character.id}>
                      <Link
                        as={RouterLink}
                        to={
                          "/characters/" +
                          character.properties.slug.formula.string
                        }
                      >
                        {character.properties.name.title[0].text.content}
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
