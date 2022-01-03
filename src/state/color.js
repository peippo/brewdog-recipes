import { atom } from "recoil";
import { INITIAL_COLOR } from "./initialValues";

export const colorAtom = atom({
	key: "color",
	default: INITIAL_COLOR,
});
