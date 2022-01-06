import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
	const location = useLocation();

	return (
		<StyledHeader>
			<Container>
				{location.pathname === "/" ? (
					<Heading>
						<Logo />
					</Heading>
				) : (
					<Link to="/">
						<Logo />
					</Link>
				)}
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

const Heading = styled.h1`
	margin: 0;
`;

export default Header;
