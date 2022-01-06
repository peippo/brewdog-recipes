import styled from "styled-components";
import useBeer from "../hooks/useBeer";
import { currentPageAtom } from "../state/currentPage";
import { useRecoilState } from "recoil";

const Pagination = () => {
	const { data: beers, isLoading, isError } = useBeer();
	const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);

	if (isLoading || isError) return null;

	return (
		<Container>
			{(beers.length === 60 || currentPage !== 1) && (
				<Button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}
				>
					Previous page
				</Button>
			)}
			{beers.length === 60 && (
				<Button onClick={() => setCurrentPage(currentPage + 1)}>
					Next page
				</Button>
			)}
		</Container>
	);
};

const Container = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 3rem;
`;

const Button = styled.button`
	background-color: var(--color-primary);
	border: 0;
	font-family: var(--font-family-heading);
	font-size: 22px;
	text-transform: uppercase;
	padding: 0.5rem 1.25rem;
	margin: 0.5rem;
	border-bottom: 6px solid var(--color-background);
	transition: all 0.25s;

	@media (min-width: 576px) {
		font-size: 24px;
		padding: 0.5rem 2rem;
	}

	&:disabled {
		filter: grayscale(100%);
		color: var(--color-background);
		opacity: 0.33;
	}

	&:enabled:hover {
		cursor: pointer;
		background-color: #b58808;
	}

	&:focus {
		outline: 0;
		text-decoration: underline;
	}

	&:focus:not(:focus-visible) {
		text-decoration: none;
	}
`;

export default Pagination;
