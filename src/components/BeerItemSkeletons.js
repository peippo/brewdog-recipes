import styled, { keyframes } from "styled-components";

const BeerItemSkeletons = () => {
	return (
		<>
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
		</>
	);
};

const loader = keyframes`
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(100%);
	}
`;

const Item = styled.li`
	padding: 1.25rem 70px 1.25rem 1.25rem;
	position: relative;
	background-color: rgba(0, 0, 0, 0.15);
	width: 100%;
	height: 100px;
	border-radius: 5px;
	overflow: hidden;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateX(-100%);
		background: linear-gradient(
			90deg,
			rgb(234 0 187 / 0%) 0,
			rgb(234 0 187 / 15%) 50%,
			rgb(234 0 187 / 0%)
		);
		animation: ${loader} 3s infinite;
	}
`;

export default BeerItemSkeletons;
