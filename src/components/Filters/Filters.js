import styled from "styled-components";
import StrengthFilter from "./StrengthFilter";

const Filters = () => {
	return (
		<Container>
			<StrengthFilter />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	max-width: 1200px;
	padding: 0 1rem;
`;

export default Filters;
