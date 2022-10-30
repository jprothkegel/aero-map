import React from 'react';
import styled, { keyframes } from 'styled-components';

const StyledContainer = styled.div`
  border-radius: 50%;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 400;
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  border: 7px solid black;
  border-top: 7px solid yellow;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 2s linear infinite;
`;

export const Loader = () => {
  return (
    <StyledContainer className="container">
      <StyledLoader className="loader" />
    </StyledContainer>
  );
};
