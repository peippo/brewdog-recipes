import styled from "styled-components";

const Footer = () => {
	return (
		<StyledFooter>
			<div>
				Recipes from{" "}
				<a href="https://www.brewdog.com/uk/community/diy-dog">
					Brewdog's DIY Dog
				</a>
			</div>
			<div>
				Served by <a href="https://punkapi.com/">Punk API</a>
			</div>
			<div>
				<a href="https://github.com/peippo/brewdog-recipes">GitHub</a>
			</div>
		</StyledFooter>
	);
};

const StyledFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	margin: auto auto 0;
	padding: 2rem 0;
	width: 100%;
	box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.25) inset;
	background: var(--color-background);
	text-align: center;

	@media (min-width: 640px) {
		flex-direction: row;

		div:not(:last-child) {
			border-right: 1px solid rgba(255, 255, 255, 0.5);
			padding-right: 1rem;
		}
	}
`;

export default Footer;
