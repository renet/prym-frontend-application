import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: #077;
  border: 0;
  border-radius: 2px;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  height: 40px;
  margin-top: 20px;
  padding: 0 10px;
`;

export const Button = ({ children, disabled, type = "submit" }) => (
  <StyledButton disabled={disabled} type={type}>
    {children}
  </StyledButton>
);
