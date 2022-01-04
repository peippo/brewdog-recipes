import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Beer from "./Beer";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route index element={<Home />} />
				<Route path="beer/:beerId" element={<Beer />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
