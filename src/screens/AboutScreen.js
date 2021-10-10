import React from "react";
import { useSelector } from "react-redux";
import Container from "../components/template/Container";

const AboutScreen = () => {
  const profile = useSelector(({ profile }) => profile);

  return (
    <Container withNavbar>
      <h2> AboutScreen </h2>
      {profile.data && (
        <div>
          <p>name: {profile.data.name}</p>
          <p>email: {profile.data.email}</p>
          <p>phone: {profile.data.phone}</p>
          <p>address: {profile.data.address}</p>
        </div>
      )}
    </Container>
  );
};

export default AboutScreen;
