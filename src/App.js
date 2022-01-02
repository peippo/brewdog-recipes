import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Beer from "./Beer";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="beer/:beerId" element={<Beer />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
