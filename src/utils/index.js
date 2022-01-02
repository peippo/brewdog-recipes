// European Brewery Convention (EBC) color units
// https://en.wikipedia.org/wiki/Beer_measurement

export const getBeerColor = (ebc) => {
	let color = "#000000";

	switch (true) {
		case ebc >= 79:
			color = "#030403";
			break;
		case ebc >= 69:
			color = "#080707";
			break;
		case ebc >= 57:
			color = "#0F0B0A";
			break;
		case ebc >= 47:
			color = "#261716";
			break;
		case ebc >= 39:
			color = "#5D341A";
			break;
		case ebc >= 33:
			color = "#8D4C32";
			break;
		case ebc >= 26:
			color = "#BC6733";
			break;
		case ebc >= 20:
			color = "#BF813A";
			break;
		case ebc >= 16:
			color = "#BF923B";
			break;
		case ebc >= 12:
			color = "#D5BC26";
			break;
		case ebc >= 8:
			color = "#ECE61A";
			break;
		case ebc >= 6:
			color = "#F6F513";
			break;
		case ebc >= 4:
			color = "#F8F753";
			break;
		default:
			break;
	}

	return color;
};
