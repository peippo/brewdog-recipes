import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { strengthAtom } from "../state/strength";
import { bitternessAtom } from "../state/bitterness";
import { colorAtom } from "../state/color";
import { currentPageAtom } from "../state/currentPage";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useBeer = (id = "") => {
	const strength = useRecoilValue(strengthAtom);
	const bitterness = useRecoilValue(bitternessAtom);
	const color = useRecoilValue(colorAtom);
	const currentPage = useRecoilValue(currentPageAtom);

	const params = `${id}?per_page=60&page=${currentPage}&abv_gt=${strength[0]}&abv_lt=${strength[1]}&ibu_gt=${bitterness[0]}&ibu_lt=${bitterness[1]}&ebc_gt=${color[0]}&ebc_lt=${color[1]}`;

	const { data, error } = useSWR(
		`https://api.punkapi.com/v2/beers/${params}`,
		fetcher
	);

	return {
		data: id && data ? data[0] : data,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useBeer;
