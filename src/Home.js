import BeerList from "./components/BeerList";
import Filters from "./components/Filters/Filters";

const Home = () => {
	return (
		<>
			<Filters />
			<BeerList />
		</>
	);
};

export default Home;
