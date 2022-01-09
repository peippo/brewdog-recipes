import { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import useBeer from "../hooks/useBeer";
import BeerItem from "./BeerItem";
import Loader from "./Loader";
import NoHits from "./NoHits";
import Error from "./Error";

const BeerList = () => {
	const { data: beers, isLoading, isError } = useBeer();

	const listRef = useRef();
	const selector = gsap.utils.selector(listRef);

	useLayoutEffect(() => {
		if (!isLoading && !isError) {
			gsap.to(selector("li"), {
				opacity: 1,
				delay: 0.25,
				stagger: (index) => (index < 15 ? index * 0.01 : 15 * 0.01),
				ease: "power2.out",
			});
		}
	});

	if (isLoading) return <Loader />;
	if (isError) return <Error />;
	if (beers.length === 0) return <NoHits />;

	return (
		<Grid aria-label="List of recipes" ref={listRef}>
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
