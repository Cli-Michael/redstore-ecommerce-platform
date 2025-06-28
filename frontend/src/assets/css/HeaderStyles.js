import styled from "styled-components";

// Styled Components
const HeaderContainer = styled.header`
  background: radial-gradient(#fff,#ffd6d6);
  padding: 20px 40px;
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Logo = styled.div`
  img {
    width: 125px;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    transition: max-height 0.3s ease-in-out;

    @media (max-width: 768px) {
      flex-direction: column;
      max-height: 0;
      overflow: hidden;
    }
  }

  ul li {
    margin: 0 10px;

    a {
      text-decoration: none;
      color: #333;
      font-size: 18px;

      &:hover {
        color: #ff523b;
      }
    }
  }
`;

const CartIcon = styled.a`
  img {
    width: 30px;
    height: 30px;
    margin-left: 15px;
  }
`;

const MenuIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1;
  margin: 20px;

  h1 {
    font-size: 36px;
    color: #333;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    color: #777;
    margin-bottom: 30px;
    line-height: 1.6;
  }

  .btn {
    display: inline-block;
    padding: 10px 20px;
    background: #ff523b;
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
    font-size: 18px;

    &:hover {
      background: #e64a19;
    }
  }
`;

const Image = styled.img`
  width: 100%;
`;
