import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentPageAtom } from "../state/currentPage";

const useScrollToTop = () => {
	const currentPage = useRecoilValue(currentPageAtom);

	useEffect(() => {
		try {
			window.scroll({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
		} catch (error) {
			window.scrollTo(0, 0);
		}
	}, [currentPage]);
};

export default useScrollToTop;
