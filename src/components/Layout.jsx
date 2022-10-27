import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
        <Header />
            <StLayout>
                {children}
            </StLayout>
    </div>
  );
};

export default Layout;

const StLayout = styled.div`
  max-width: 1000px;
  min-width: 800px;
  margin: 0 auto;
  background-color: ${({ bgColor }) => {
    return bgColor;
  }};
`;
