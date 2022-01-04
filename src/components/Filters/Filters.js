import styled from "styled-components";
import StrengthFilter from "./StrengthFilter";
import BitternessFilter from "./BitternessFilter";
import ColorFilter from "./ColorFilter";

const Filters = () => {
	return (
		<Container>
			<DoubleRow>
				<StrengthFilter />
				<BitternessFilter />
			</DoubleRow>
			<SingleRow>
				<ColorFilter />
			</SingleRow>
		</Container>
	);
};

const Container = styled.div`
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
