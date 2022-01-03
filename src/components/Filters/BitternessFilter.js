import { useState } from "react";
import styled from "styled-components";
import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { bitternessAtom } from "../../state/bitterness";
import { INITIAL_BITTERNESS } from "../../state/initialValues";

// TODO: logarithmic scale

const BitternessFilter = () => {
	const [bitterness, setBitterness] = useRecoilState(bitternessAtom);
	const [value, setValue] = useState(bitterness);

	const minDistance = 10;

	const handleChange = (event, newValue, thumbIndex) => {
		if (thumbIndex === 0) {
			setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
		} else {
			setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
		}
	};

	const handleCommittedChange = (event, value) => {
		setBitterness(value);
	};

	const thumbAriaLabel = (thumbIndex) => {
		if (thumbIndex === 0) {
			return `Minimum bitterness`;
		} else {
			return `Maximum bitterness`;
		}
	};

	const thumbAriaValueText = (value, thumbIndex) => {
		if (thumbIndex === 0) {
			return `Minimum bitterness ${value}`;
		} else {
			return `Maximum bitterness ${value}`;
		}
	};

	return (
		<Container>
			<Label id="bitterness-label">Bitterness (IBU)</Label>
			<Slider
				value={value}
				min={INITIAL_BITTERNESS[0]}
				max={INITIAL_BITTERNESS[1]}
				onChange={handleChange}
				onChangeCommitted={handleCommittedChange}
				aria-labelledby="bitterness-label"
				getAriaLabel={thumbAriaLabel}
				getAriaValueText={thumbAriaValueText}
				valueLabelDisplay="auto"
			/>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Label = styled.p`
	font-family: var(--font-family-heading);
	text-transform: uppercase;
	font-size: 20px;
	margin: 0;
`;

export default BitternessFilter;
