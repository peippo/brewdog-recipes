import styled from "styled-components";
import useBeer from "../hooks/useBeer";
import BeerItem from "./BeerItem";
import Loader from "./Loader";
import NoHits from "./NoHits";
import Error from "./Error";

const BeerList = () => {
	const { data: beers, isLoading, isError } = useBeer();

	if (isLoading) return <Loader />;
	if (isError) return <Error />;
	if (beers.length === 0) return <NoHits />;

	return (
		<Grid aria-label="List of recipes">
			{beers.map((beer, index) => (
				<BeerItem key={beer.id} beer={beer} index={index} />
			))}
		</Grid>
	);
};

const Grid = styled.ul`
	display: grid;
	grid-template-columns: 1fr;
	gap: 0.5rem;
	list-style-type: none;
	padding: 0 1.5rem;
	margin: 0 auto 3rem;
	width: 100%;
	max-width: 1500px;

	@media (min-width: 576px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 992px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export default BeerList;
