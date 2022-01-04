import styled from "styled-components";

const Error = () => {
	return (
		<Container>
			<TanksIllustration src="/illustration-tanks.png" alt="" />
			<Text>
				<span>Error!</span> Pipes clogged, unable to siphon beer
			</Text>
			<SmallText>
				Punk API might be down or we hit a limit, try again later
			</SmallText>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: 4rem 0 2rem;
	padding: 0 1.5rem;
`;

const TanksIllustration = styled.img`
	width: 400px;
	max-width: 100%;
	height: auto;
`;

const Text = styled.p`
	font-family: var(--font-family-heading);
	font-size: 32px;
	margin: 2rem 0 0;
	color: var(--color-secondary);

	span {
		color: #c30000e3;
	}
`;

const SmallText = styled.p`
	font-size: 18px;
	margin-top: 0;
	opacity: 0.5;
`;

export default Error;
