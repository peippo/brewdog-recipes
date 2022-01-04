import { Helmet } from "react-helmet";
import BeerList from "./components/BeerList";
import Filters from "./components/Filters/Filters";

const Home = () => {
	return (
		<>
			<Helmet>
				<title>Brewdog Brew Recipes</title>
				<meta name="title" content="Brewdog Brew Recipes" />
				<meta name="description" content="Homebrewing for punks" />
				<meta
					property="og:image"
					content="https://brewdog-recipes.surge.sh/share.png"
				/>
				<meta
					property="twitter:image"
					content="https://brewdog-recipes.surge.sh/share.png"
				/>
				<meta property="twitter:card" content="summary_large_image" />
			</Helmet>
			<Filters />
			<BeerList />
		</>
	);
};

export default Home;
