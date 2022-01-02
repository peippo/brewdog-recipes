import { useParams } from "react-router-dom";
import useBeer from "./hooks/useBeer";

const Beer = () => {
	const { beerId } = useParams();
	const { data: beer, isLoading, isError } = useBeer(beerId);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error!</p>;

	return <>{beer.name}</>;
};

export default Beer;
