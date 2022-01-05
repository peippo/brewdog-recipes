import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<StyledHeader>
			<Container>
				<StyledLink to="/">
					<Logo
						srcSet="/logo.png, /logo_2x.png 2x"
						src="/logo.png"
						alt="BrewDog Brew Recipes"
					/>
				</StyledLink>
			</Container>
		</StyledHeader>
	);
};

const StyledHeader = styled.header`
	background-image: url("/header-pattern.png");
	background-size: contain;
	background-repeat: repeat-x;
	min-height: 200px;
	box-shadow: 0 10px 30px 10px var(--color-background) inset;
`;

const Container = styled.div`
	display: flex;
	padding: 0 1.5rem;
	margin: 0 auto;
	max-width: 1200px;
`;

const StyledLink = styled(Link)`
	margin-top: 1.5rem;
`;

const Logo = styled.img`
	max-width: 500px;
	width: 100%;
	height: auto;
	display: block;
`;

export default Header;
