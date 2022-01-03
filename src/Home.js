import BeerList from "./components/BeerList";
import Filters from "./components/Filters/Filters";

const Home = () => {
	return (
		<>
			<h1>Brewdog recipes</h1>
			<Filters />
			<BeerList />
		</>
	);
};

export default Home;
