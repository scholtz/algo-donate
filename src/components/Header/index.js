import React from "react";
import { Card, Box, Heading, Flex } from "pipeline-ui";
import { Algo } from "@pipeline-ui/icons";
import "./Header.css";
function Header() {
  return (
    <Card>
      <Flex>
        <Box className={"Title"} width={1 / 2}>
          <Heading as={"h1"} className={"Title-heading"}>
            Algorand donations
          </Heading>
        </Box>
        <Box className={"TitleLogo"} width={1 / 2}>
          <Algo color="black" size="50" />
        </Box>
      </Flex>
    </Card>
  );
}

export default Header;
