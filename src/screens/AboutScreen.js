import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "../components/template/Container";

const AboutScreen = () => {
  const profile = useSelector(({ profile }) => profile);
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <Container withNavbar>
      <Typography>About</Typography>
    </Container>
  );
};

export default AboutScreen;
