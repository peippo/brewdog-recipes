import styled from "styled-components";

const Logo = () => {
	return (
		<LogoImage
			srcSet="/logo.png, /logo_2x.png 2x"
			src="/logo.png"
			alt="BrewDog Brew Recipes"
		/>
	);
};

const LogoImage = styled.img`
	max-width: 500px;
	width: 100%;
	height: auto;
	display: block;
	margin-top: 1.5rem;
`;

export default Logo;
