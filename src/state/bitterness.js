import { atom } from "recoil";
import { INITIAL_BITTERNESS } from "./initialValues";

export const bitternessAtom = atom({
	key: "bitterness",
	default: INITIAL_BITTERNESS,
});
