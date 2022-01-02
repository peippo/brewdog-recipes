import styled from "styled-components";
import useBeer from "../hooks/useBeer";
import BeerItem from "./BeerItem";

const BeerList = () => {
	const { data: beers, isLoading, isError } = useBeer();

	console.log(beers);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error!</p>;

	return (
		<Grid>
			{beers.map((beer) => (
				<BeerItem key={beer.id} beer={beer} />
			))}
		</Grid>
	);
};

const Grid = styled.ul`
	display: grid;
	grid-template-columns: 1fr;
	gap: 0.5rem;
	list-style-type: none;
	padding: 0.5rem;
	margin: 0;

	@media (min-width: 576px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 992px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export default BeerList;
