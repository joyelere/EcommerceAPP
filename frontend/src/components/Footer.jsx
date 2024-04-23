import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px; /* Adjust the gap between columns as needed */
`;

const ListItem = styled.li`
  width: 100%;
  margin-bottom: 10px;
  &:nth-child(-n + 4) {
    grid-column: 1; /* Items 1 to 4 in the first column */
  }
  &:nth-child(n + 5) {
    grid-column: 2; /* Items 5 and onwards in the second column */
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>LUWAFY</Logo>
        <Desc>
          Welcome to LUWAFY Fashion - Your ultimate destination for trendy and
          affordable clothing! Explore our curated collection of stylish
          outfits, from casual wear to formal attire, designed to elevate your
          wardrobe. Enjoy hassle-free shopping, fast delivery, and exceptional
          customer service. Step into fashion with LUWAFY today.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <StyledLink to={"/"}>
            <ListItem>Home</ListItem>
          </StyledLink>
          <StyledLink to={"/cart"}>
            <ListItem>Cart</ListItem>
          </StyledLink>
          <StyledLink to={"/products/men"}>
            <ListItem>Man Fashion</ListItem>
          </StyledLink>
          <StyledLink to={"/products/women"}>
            <ListItem>Woman Fashion</ListItem>
          </StyledLink>
          <StyledLink to={""}>
            <ListItem>My Account</ListItem>
          </StyledLink>
          <StyledLink to={""}>
            <ListItem>Order Tracking</ListItem>
          </StyledLink>
          <StyledLink to={""}>
            <ListItem>Terms</ListItem>
          </StyledLink>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 2, Bilewu Oshoffa Crescent
          Off Mojisola Street.
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +234 9086786910
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />{" "}
          luwafyfashion@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
