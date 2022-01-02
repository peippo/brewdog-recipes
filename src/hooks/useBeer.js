import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useBeer = (id = "") => {
	const { data, error } = useSWR(
		`https://api.punkapi.com/v2/beers/${id}?per_page=60`,
		fetcher
	);

	return {
		data: id && data ? data[0] : data,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useBeer;
