import styled, { keyframes } from "styled-components";

const Bubbles = () => {
	return (
		<>
			<Bubble1></Bubble1>
			<Bubble2></Bubble2>
			<Bubble3></Bubble3>
			<Bubble4></Bubble4>
			<Bubble5></Bubble5>
		</>
	);
};

const bubble = keyframes`
    0% {
        bottom: 0;
    }

    50% {
        background-color: rgba(255, 255, 255, 0.2);
        bottom: 80px;
    }

    100% {
        background-color: rgba(255, 255, 255, 0);
        bottom: 160px;
    }
`;

const Bubble = styled.div`
	animation-name: ${bubble};
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	background-color: rgba(255, 255, 255, 0.2);
	bottom: 0;
	position: absolute;
	border-radius: 10px;
	height: 20px;
	width: 20px;
`;

const Bubble1 = styled(Bubble)`
	left: 10px;
	animation-delay: 1000ms;
	animation-duration: 1000ms;
`;

const Bubble2 = styled(Bubble)`
	left: 50px;
	animation-delay: 700ms;
	animation-duration: 1100ms;
`;

const Bubble3 = styled(Bubble)`
	left: 100px;
	animation-delay: 1200ms;
	animation-duration: 1300ms;
`;

const Bubble4 = styled(Bubble)`
	left: 130px;
	animation-delay: 1100ms;
	animation-duration: 700ms;
`;

const Bubble5 = styled(Bubble)`
	left: 170px;
	animation-delay: 1300ms;
	animation-duration: 800ms;
`;

export default Bubbles;
