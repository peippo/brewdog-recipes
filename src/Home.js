import { Helmet } from "react-helmet";
import BeerList from "./components/BeerList";
import Filters from "./components/Filters/Filters";
import Pagination from "./components/Pagination";
import useScrollToTop from "./hooks/useScrollToTop";

const Home = () => {
	useScrollToTop();

	return (
		<>
			<Helmet>
				<title>BrewDog Brew Recipes</title>
				<meta name="title" content="BrewDog Brew Recipes" />
			</Helmet>
			<main>
				<Filters />
				<BeerList />
				<Pagination />
			</main>
		</>
	);
};

export default Home;
