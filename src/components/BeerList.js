import { Link } from "react-router-dom";
import useBeer from "../hooks/useBeer";

const BeerList = () => {
	const { data: beers, isLoading, isError } = useBeer();

	console.log(beers);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error!</p>;

	return (
		<>
			{beers.map((beer) => (
				<Link to={`/beer/${beer.id}`}>
					<p>{beer.name}</p>
				</Link>
			))}
		</>
	);
};

export default BeerList;
