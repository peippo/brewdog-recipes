import styled from "styled-components";
import Bubbles from "./Bubbles";

const strings = [
	"pouring",
	"filtering",
	"bottling",
	"fermenting",
	"siphoning",
	"brewing",
	"boiling",
	"mashing",
];

const Loader = () => {
	return (
		<Container>
			<BubblesWrapper>
				<Bubbles />
			</BubblesWrapper>
			<Text>{strings[Math.floor(Math.random() * strings.length)]}...</Text>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	margin: 6rem auto 0;
`;

const BubblesWrapper = styled.div`
	position: absolute;
	bottom: 0;
	width: 200px;
	height: 100px;
	transform: scale(0.5);
`;

const Text = styled.p`
	font-family: var(--font-family-heading);
	font-size: 48px;
	text-transform: uppercase;
	color: var(--color-primary);
	z-index: 1;
	border-radius: 20px;
	margin: 0;
`;

export default Loader;
