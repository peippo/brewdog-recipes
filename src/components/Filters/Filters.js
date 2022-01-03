import styled from "styled-components";
import StrengthFilter from "./StrengthFilter";
import BitternessFilter from "./BitternessFilter";

const Filters = () => {
	return (
		<Container>
			<StrengthFilter />
			<BitternessFilter />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	gap: 2rem;
	max-width: 1200px;
	padding: 0 1rem;

	@media (min-width: 992px) {
		flex-direction: row;
	}
`;

export default Filters;
