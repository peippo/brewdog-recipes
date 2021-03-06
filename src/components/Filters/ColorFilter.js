import { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "@mui/material/Slider";
import { useRecoilState, useSetRecoilState } from "recoil";
import { colorAtom } from "../../state/color";
import { currentPageAtom } from "../../state/currentPage";
import { INITIAL_COLOR } from "../../state/initialValues";
import { getBeerColorName } from "../../utils";
import "./ColorFilter.css";

const ColorFilter = () => {
	const [color, setColor] = useRecoilState(colorAtom);
	const setCurrentPage = useSetRecoilState(currentPageAtom);
	const [value, setValue] = useState(color);

	const minDistance = 1;

	const handleChange = (event, newValue, thumbIndex) => {
		if (thumbIndex === 0) {
			setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
		} else {
			setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
		}
	};

	const handleCommittedChange = (event, value) => {
		if (event) {
			setCurrentPage(1);
		}

		// If slider max thumb is at initial max value, set it to 9999
		let adjustedValue = value;
		if (value[1] === INITIAL_COLOR[1]) {
			adjustedValue = [value[0], 9999];
		}

		setColor(adjustedValue);
	};

	// Trigger handleCommittedChange on load
	useEffect(() => {
		handleCommittedChange(null, value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const thumbAriaLabel = (thumbIndex) => {
		if (thumbIndex === 0) {
			return `Color starting from`;
		} else {
			return `Color ending to`;
		}
	};

	const thumbAriaValueText = (value) => {
		return getBeerColorName(value);
	};

	return (
		<Container>
			<Label id="strength-label">Color</Label>
			<Slider
				className="color-slider"
				value={value}
				min={INITIAL_COLOR[0]}
				max={INITIAL_COLOR[1]}
				onChange={handleChange}
				onChangeCommitted={handleCommittedChange}
				aria-labelledby="strength-label"
				getAriaLabel={thumbAriaLabel}
				getAriaValueText={thumbAriaValueText}
				valueLabelDisplay="off"
				sx={{
					color: "var(--color-primary)",
				}}
			/>
		</Container>
	);
};

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

export default ColorFilter;
