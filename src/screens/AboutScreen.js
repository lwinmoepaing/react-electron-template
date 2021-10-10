import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/template/Container";
import { profileActions } from "../store/reducers/profile";

const AboutScreen = () => {
  const dispatch = useDispatch();
  const profile = useSelector(({ profile }) => profile);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const updateProfile = () => {
    const param = {
      name: "Test Name",
      email: "lwinmoepaing.dev@gmail.com",
      phone: "+959420059241",
      address: "No.32 Tharsu Str.",
    };
    return dispatch({ type: profileActions.UPDATE_PROFILE, param });
  };

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
      <button onClick={updateProfile}>Update Profile</button>
    </Container>
  );
};

export default AboutScreen;
