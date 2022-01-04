import styled from "styled-components";
import { useParams } from "react-router-dom";
import useBeer from "./hooks/useBeer";
import { getBeerColor } from "./utils";
import "./tables.css";
import { ReactComponent as MaltIcon } from "./icons/icon-malt.svg";
import { ReactComponent as HopsIcon } from "./icons/icon-hops.svg";
import { ReactComponent as YeastIcon } from "./icons/icon-yeast.svg";
import Bubbles from "./components/Bubbles";
import Loader from "./components/Loader";

const Beer = () => {
	const { beerId } = useParams();
	const { data: beer, isLoading, isError } = useBeer(beerId);

	if (isLoading) return <Loader />;
	if (isError) return <p>Error!</p>;

	const ebc = beer.ebc ? beer.ebc : 100;
	const hasImage =
		beer.image_url &&
		!beer.image_url.includes("keg.png") &&
		!beer.image_url.includes("cask.png");

	return (
		<Container>
			<section>
				<Header ebc={ebc}>
					<div>
						<Name>{beer.name}</Name>
						<Tagline>{beer.tagline}</Tagline>
					</div>
					<BubblesWrapper>
						<Bubbles />
					</BubblesWrapper>
					<DetailBoxes>
						<DetailBox ebc={ebc}>
							ABV <span>{beer.abv}%</span>
						</DetailBox>
						<DetailBox ebc={ebc}>
							IBU <span>{beer.ibu}</span>
						</DetailBox>
					</DetailBoxes>
				</Header>
				<Cols>
					<Col width={50}>
						<Description>{beer.description}</Description>
					</Col>
					<Col width={35}>
						<table>
							<tbody>
								<tr>
									<th>Volume</th>
									<td>
										{beer.volume.value} {beer.volume.unit}
									</td>
								</tr>
								<tr>
									<th>Boil volume</th>
									<td>
										{beer.boil_volume.value} {beer.boil_volume.unit}
									</td>
								</tr>
								<tr>
									<th>ABV</th>
									<td>{beer.abv}%</td>
								</tr>
								<tr>
									<th>Target FG</th>
									<td>{beer.target_fg}</td>
								</tr>
								<tr>
									<th>Target OG</th>
									<td>{beer.target_og}</td>
								</tr>
								<tr>
									<th>EBC</th>
									<td>{beer.ebc}</td>
								</tr>
								<tr>
									<th>SRM</th>
									<td>{beer.srm}</td>
								</tr>
								<tr>
									<th>Attenuation level</th>
									<td>{beer.attenuation_level}%</td>
								</tr>
							</tbody>
						</table>
					</Col>
					<Col width={15}>
						{hasImage && (
							<DesktopImage src={beer.image_url} loading="lazy" />
						)}
					</Col>
				</Cols>
			</section>

			<section>
				<SectionHeading>Ingredients &amp; process</SectionHeading>

				<Cols>
					<Col width={30}>
						<BackgroundGradient>
							<IconHeading>
								<MaltIcon />
								<SubHeading>Malt</SubHeading>
							</IconHeading>
						</BackgroundGradient>
						<table>
							<thead>
								<tr>
									<th>Type</th>
									<th>kg</th>
								</tr>
							</thead>
							<tbody>
								{beer.ingredients.malt.map((row) => {
									return (
										<tr>
											<td>
												<strong>{row.name}</strong>
											</td>
											<td>{row.amount.value}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</Col>
					<Col width={45}>
						<BackgroundGradient>
							<IconHeading>
								<HopsIcon />
								<SubHeading>Hops</SubHeading>
							</IconHeading>
						</BackgroundGradient>
						<table>
							<thead>
								<tr>
									<th>Variety</th>
									<th>g</th>
									<th>Add</th>
									<th>
										Attr<HideInMobile>ibute</HideInMobile>
									</th>
								</tr>
							</thead>
							<tbody>
								{beer.ingredients.hops.map((row) => {
									return (
										<tr>
											<td>
												<strong>{row.name}</strong>
											</td>
											<td>{row.amount.value}</td>
											<td>{row.add}</td>
											<td>{row.attribute}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</Col>
					<Col width={25}>
						<BackgroundGradient>
							<IconHeading>
								<YeastIcon />
								<SubHeading>Yeast</SubHeading>
							</IconHeading>
						</BackgroundGradient>

						<Text>{beer.ingredients.yeast}</Text>
					</Col>
				</Cols>

				<Cols>
					<Col>
						<BackgroundGradient>
							<SubHeading>Method / timings</SubHeading>
						</BackgroundGradient>
						<table>
							<thead>
								<tr>
									<th>Method</th>
									<th>Temp</th>
									<th>Time</th>
								</tr>
							</thead>
							<tbody>
								{beer.method.mash_temp.map((row) => {
									return (
										<tr>
											<th>Mash temp</th>
											<td>
												{row.temp.value} {row.temp.unit}
											</td>
											<td>{row.duration} mins</td>
										</tr>
									);
								})}
								<tr>
									<th>Fermentation</th>
									<td>
										{beer.method.fermentation.temp.value}{" "}
										{beer.method.fermentation.temp.unit}
									</td>
								</tr>
							</tbody>
						</table>
					</Col>
					<Col>
						<BackgroundGradient>
							<SubHeading>Brewer's tip</SubHeading>
						</BackgroundGradient>
						<BrewersText>{beer.brewers_tips}</BrewersText>
						<BearIllustration src="/illustration-bear.png" alt="" />
					</Col>
				</Cols>
			</section>

			<section>
				<SectionHeading>Food pairing</SectionHeading>
				<FoodPairing>
					<RabbitIllustration src="/illustration-rabbit.png" alt="" />
					<FoodList>
						{beer.food_pairing.map((food) => {
							return <FoodItem>{food}</FoodItem>;
						})}
					</FoodList>
				</FoodPairing>
			</section>
		</Container>
	);
};

const Container = styled.main`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	gap: 1rem 3rem;
	padding: 0 1.5rem;
	margin: auto;
	max-width: 1200px;

	@media (min-width: 992px) {
		padding: 0 2.5rem;
	}
`;

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	color: ${(props) => (props.ebc > 25 ? "#ffffff" : "#000000")};
	background-color: ${(props) => getBeerColor(props.ebc)};
	padding: 2rem;
	margin-bottom: 2rem;
	text-align: center;
	position: relative;
	border-bottom: 5px solid var(--color-background);
	overflow: hidden;

	&:after {
		content: "";
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		right: 0.5rem;
		bottom: 0.5rem;
		width: calc(100% - 1rem);
		height: calc(100% - 1rem);
		border: 1px solid currentColor;
	}

	@media (min-width: 992px) {
		flex-direction: row;
		text-align: left;
	}
`;

const BubblesWrapper = styled.div`
	position: absolute;
	right: 0;
	bottom: -20px;
	width: 250px;
	height: 100%;
`;

const Name = styled.h1`
	font-size: 48px;
	line-height: 1;
	margin: 0;

	@media (min-width: 992px) {
		font-size: 64px;
	}
`;

const Tagline = styled.p`
	font-size: 20px;
	margin-top: 0;

	@media (min-width: 992px) {
		font-size: 24px;
		margin: 0;
	}
`;

const DetailBoxes = styled.div`
	display: flex;
	gap: 1rem;
`;

const DetailBox = styled.p`
	border: 1px solid currentColor;
	padding: 1rem;
	font-weight: 700;
	margin: 0;
	position: relative;
	z-index: 10;
	background-color: ${(props) => getBeerColor(props.ebc)};
	opacity: 0.85;

	span {
		font-weight: 400;
		display: block;
		font-size: 28px;
	}
`;

const Description = styled.p`
	font-size: 20px;
	line-height: 1.5;

	&:first-letter {
		line-height: 1;
		display: block;
		float: left;
		font-size: 3.75rem;
		margin-right: 0.75rem;
	}

	@media (min-width: 992px) {
		padding-left: 2rem;
	}
`;

const SectionHeading = styled.h2`
	font-size: 32px;
	margin: 3rem 0 0;
	color: var(--color-primary);
	text-align: center;
	position: relative;
	text-shadow: 0 0 10px var(--color-background),
		-5px 0 10px var(--color-background), 5px 0 10px var(--color-background);

	&:before {
		content: "";
		width: 100%;
		height: 1px;
		background: var(--color-primary);
		left: 0;
		top: calc(50% - 2px);
		position: absolute;
		z-index: -1;
	}
`;

const SubHeading = styled.h3`
	font-size: 32px;
	margin: 0;
	color: var(--color-secondary);
	text-shadow: 0 4px 3px var(--color-background);
`;

const BackgroundGradient = styled.div`
	background: linear-gradient(
		to bottom,
		var(--color-background),
		rgba(0, 0, 0, 0.01)
	);
	border-radius: 10px 10px 0 0;
	padding: 0.5rem 1rem;
`;

const IconHeading = styled.div`
	display: flex;
	align-items: center;
	color: var(--color-secondary);

	svg {
		max-width: 34px;
		max-height: 40px;
		margin-right: 0.75rem;
	}
`;

const Text = styled.p`
	margin-top: 0;
	padding: 0 1rem;
	line-height: 1.4;
`;

const BrewersText = styled.p`
	margin-top: 0;
	padding: 0 10rem 0 1rem;
	line-height: 1.4;
`;

const Cols = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem 2rem;
	width: 100%;
	margin-bottom: 2rem;

	@media (min-width: 992px) {
		flex-direction: row;
	}
`;

const Col = styled.div`
	position: relative;
	width: 100%;
	flex-basis: ${(props) => (props.width ? `${props.width}%` : "auto")};
`;

const DesktopImage = styled.img`
	display: none;

	@media (min-width: 992px) {
		display: block;
		width: 100%;
		transform: rotate(5deg);
		position: absolute;
		right: -20px;
		top: -175px;
		filter: drop-shadow(30px 20px 10px rgba(32, 20, 20, 0.8));
	}

	@media (min-width: 1200px) {
		top: -220px;
		right: -50px;
	}
`;

const BearIllustration = styled.img`
	position: absolute;
	right: -10px;
	top: -10px;
	width: 150px;

	@media (min-width: 992px) {
		width: 200px;
		right: -50px;
		top: -50px;
	}
`;

const RabbitIllustration = styled.img`
	position: absolute;
	left: -10px;
	top: -10px;
	width: 150px;

	@media (min-width: 992px) {
		width: 200px;
		left: -50px;
		top: -80px;
	}
`;

const FoodPairing = styled.ul`
	display: flex;
	position: relative;
	margin: 0;
`;

const FoodList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	list-style-type: none;
	margin: 0 0 100px 0;
	padding: 0 0 0 100px;
`;

const FoodItem = styled.li`
	padding: 1rem;
	margin: 0.5rem;
	background-color: var(--color-background);
	border: 1px solid rgba(255, 255, 255, 0.25);
`;

const HideInMobile = styled.span`
	display: none;

	@media (min-width: 576px) {
		display: inline;
	}
`;

export default Beer;
