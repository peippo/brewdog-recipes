import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import StrengthFilter from "./StrengthFilter";
import BitternessFilter from "./BitternessFilter";
import ColorFilter from "./ColorFilter";

const Filters = () => {
	const strengthFilterRef = useRef();
	const bitternessFilterRef = useRef();
	const colorFilterRef = useRef();

	useLayoutEffect(() => {
		const filterRefs = [
			strengthFilterRef.current,
			bitternessFilterRef.current,
			colorFilterRef.current,
		];

		gsap.fromTo(
			filterRefs,
			{ y: "-30px", opacity: 0 },
			{ y: 0, opacity: 1, stagger: 0.15 }
		);
	}, []);

	return (
		<Container>
			<h2 className="screen-reader-text">Filter recipes</h2>
			<DoubleRow>
				<StrengthFilter ref={strengthFilterRef} />
				<BitternessFilter ref={bitternessFilterRef} />
			</DoubleRow>
			<SingleRow ref={colorFilterRef}>
				<ColorFilter />
			</SingleRow>
		</Container>
	);
};

const Container = styled.header`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	gap: 1rem 3rem;
	padding: 0 2.5rem;
	margin: -3rem auto 2rem;
	max-width: 1200px;
	width: 100%;

	@media (min-width: 992px) {
		flex-direction: row;
	}
`;

const DoubleRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem 3rem;
	width: 100%;

	@media (min-width: 680px) {
		flex-direction: row;
	}
`;

const SingleRow = styled.div`
	display: flex;
	gap: 1rem 3rem;
	width: 100%;
	flex-basis: 50%;
`;

export default Filters;
