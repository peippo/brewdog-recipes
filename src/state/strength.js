import { atom } from "recoil";
import { INITIAL_STRENGTH } from "./initialValues";

export const strengthAtom = atom({
	key: "strength",
	default: INITIAL_STRENGTH,
});
