import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AuthWrapper = ({ children }) => {
  // introduce this component to fix the bug (even when logged in, if go to localhost:3000/checkout, will get kick back to the homepage
  // as it takes longer to get the user from the useUserContext than normally would be from Auth0)
  // Then we will wrap the whole app in this, so essentially checking if we're loading, or if there's a error.
  // Once we're done loading, will display the children, which is the app in this case
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  return <>{children}</>;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
