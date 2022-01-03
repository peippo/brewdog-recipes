import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { strengthAtom } from "../state/strength";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useBeer = (id = "") => {
	const strength = useRecoilValue(strengthAtom);

	const { data, error } = useSWR(
		`https://api.punkapi.com/v2/beers/${id}?per_page=60&abv_gt=${strength[0]}&abv_lt=${strength[1]}`,
		fetcher
	);

	return {
		data: id && data ? data[0] : data,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useBeer;
