import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import GlobalStyles from "@material-ui/core/GlobalStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import React, { useState } from "react";
import Logo from "./Logo";

type BoxedLayoutProps = {
  children: React.ReactNode;
};

const BoxedLayout = ({ children }: BoxedLayoutProps) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ body: { backgroundColor: theme.palette.background.paper } }}
      />
      <Container component="main" maxWidth="xs" sx={{ mt: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo sx={{ mb: 2 }} />
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default BoxedLayout;
