import { forwardRef, useState } from "react";
import styled from "styled-components";
import Slider from "@mui/material/Slider";
import { useRecoilState, useSetRecoilState } from "recoil";
import { strengthAtom } from "../../state/strength";
import { currentPageAtom } from "../../state/currentPage";
import { INITIAL_STRENGTH } from "../../state/initialValues";

const StrengthFilter = forwardRef((props, ref) => {
	const [strength, setStrength] = useRecoilState(strengthAtom);
	const setCurrentPage = useSetRecoilState(currentPageAtom);
	const [value, setValue] = useState(strength);

	const minDistance = 1;

	const handleChange = (event, newValue, thumbIndex) => {
		if (thumbIndex === 0) {
			setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
		} else {
			setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
		}
	};

	const handleCommittedChange = (event, value) => {
		setCurrentPage(1);
		setStrength(value);
	};

	const thumbAriaLabel = (thumbIndex) => {
		if (thumbIndex === 0) {
			return `Minimum volume`;
		} else {
			return `Maximum volume`;
		}
	};

	const marks = [
		{
			value: 0,
			label: "0%",
		},
		{
			value: 5,
			label: "5%",
		},
		{
			value: 10,
			label: "10%",
		},
		{
			value: 15,
			label: "15%",
		},
		{
			value: 20,
			label: "20%",
		},
		{
			value: 35,
			label: "35%",
		},
		{
			value: 45,
			label: "45%",
		},
	];

	return (
		<Container ref={ref}>
			<Label id="strength-label">Alcohol by volume (%)</Label>
			<Slider
				value={value}
				min={INITIAL_STRENGTH[0]}
				max={INITIAL_STRENGTH[1]}
				onChange={handleChange}
				onChangeCommitted={handleCommittedChange}
				aria-labelledby="strength-label"
				getAriaLabel={thumbAriaLabel}
				valueLabelDisplay="auto"
				valueLabelFormat={(value) => `${value}%`}
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

export default StrengthFilter;
