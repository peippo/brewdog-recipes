import styled from "styled-components";

const NoHits = () => {
	return (
		<Container>
			<IngredientsIllustration src="/illustration-ingredients.png" alt="" />
			<Text>Sorry, no beers like that brewed yet!</Text>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 6rem;

	@media (min-width: 576px) {
		flex-direction: row;
	}
`;

const IngredientsIllustration = styled.img`
	width: 200px;
`;

const Text = styled.p`
	font-family: var(--font-family-heading);
	font-size: 32px;
	margin: 2rem;
	color: var(--color-secondary);
`;

export default NoHits;
