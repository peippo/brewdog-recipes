import { forwardRef, useState } from "react";
import styled from "styled-components";
import Slider from "@mui/material/Slider";
import { useRecoilState, useSetRecoilState } from "recoil";
import { bitternessAtom } from "../../state/bitterness";
import { currentPageAtom } from "../../state/currentPage";
import { INITIAL_BITTERNESS } from "../../state/initialValues";

const marks = [
	{
		value: 0,
		label: "0",
	},
	{
		value: 1,
		label: "1",
	},
	{
		value: 2,
		label: "2",
	},
	{
		value: 3,
		label: "3",
	},
	{
		value: 4,
		label: "4",
	},
	{
		value: 5,
		label: "5",
	},
	{
		value: 6,
		label: "6",
	},
	{
		value: 7,
		label: "7",
	},
	{
		value: 8,
		label: "8",
	},
	{
		value: 9,
		label: "9",
	},
	{
		value: 10,
		label: "10",
	},
];

const MIN_POSITION = 0;
const MAX_POSITION = 10;
const MIN_VALUE = Math.log(INITIAL_BITTERNESS[0] || 1);
const MAX_VALUE = Math.log(INITIAL_BITTERNESS[1]);
const SCALE = (MAX_VALUE - MIN_VALUE) / (MAX_POSITION - MIN_POSITION);

const getLogValue = (position) => {
	return Math.floor(Math.exp(MIN_VALUE + SCALE * (position - MIN_POSITION)));
};

const getSliderPosition = (value) => {
	return Math.ceil((Math.log(value) - MIN_VALUE) / SCALE + MIN_POSITION);
};

const BitternessFilter = forwardRef((props, ref) => {
	const [bitterness, setBitterness] = useRecoilState(bitternessAtom);
	const setCurrentPage = useSetRecoilState(currentPageAtom);
	const [value, setValue] = useState([
		getSliderPosition(bitterness[0]),
		getSliderPosition(bitterness[1]),
	]);

	const handleChange = (event, newValue, thumbIndex) => {
		const minDistance = 1;

		if (thumbIndex === 0) {
			setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
		} else {
			setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
		}
	};

	const handleCommittedChange = (event, value) => {
		setCurrentPage(1);

		const min = getLogValue(value[0]);
		const max = getLogValue(value[1]);
		setBitterness([min, max]);
	};

	const thumbAriaLabel = (thumbIndex) => {
		if (thumbIndex === 0) {
			return `Minimum bitterness`;
		} else {
			return `Maximum bitterness`;
		}
	};

	return (
		<Container ref={ref}>
			<Label id="bitterness-label">Bitterness</Label>
			<Slider
				value={value}
				min={MIN_POSITION}
				max={MAX_POSITION}
				onChange={handleChange}
				onChangeCommitted={handleCommittedChange}
				aria-labelledby="bitterness-label"
				getAriaLabel={thumbAriaLabel}
				valueLabelDisplay="auto"
				marks={marks}
				sx={{
					color: "var(--color-primary)",
				}}
			/>
		</Container>
	);
});

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Label = styled.h3`
	font-family: var(--font-family-heading);
	text-transform: uppercase;
	font-size: 24px;
	margin: 0;
	text-shadow: 0 3px 3px rgba(0, 0, 0, 0.75);
`;

export default BitternessFilter;
