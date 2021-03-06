import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useBeer from "./hooks/useBeer";
import { getBeerColor, removeSentencePeriod } from "./utils";
import "./tables.css";
import { ReactComponent as MaltIcon } from "./icons/icon-malt.svg";
import { ReactComponent as HopsIcon } from "./icons/icon-hops.svg";
import { ReactComponent as YeastIcon } from "./icons/icon-yeast.svg";
import Bubbles from "./components/Bubbles";
import Loader from "./components/Loader";
import Error from "./components/Error";

const Beer = () => {
	const { beerId } = useParams();
	const { data: beer, isLoading, isError } = useBeer(beerId);

	const timelineRef = useRef();
	const headerRef = useRef();
	const descriptionRef = useRef();
	const basicsRef = useRef();
	const imageRef = useRef();
	const ingredientsRef = useRef();
	const foodRef = useRef();

	useLayoutEffect(() => {
		if (!isLoading && !isError) {
			timelineRef.current = gsap
				.timeline({
					defaults: { duration: 0.2, opacity: 0 },
				})
				.from(headerRef.current, { opacity: 0, duration: 0.5, delay: 0.2 })
				.from(descriptionRef.current, {
					y: -30,
				})
				.from(basicsRef.current, {
					y: -30,
				})
				.from(ingredientsRef.current, {
					y: -30,
				})
				.from(foodRef.current, { y: -30 })
				.from(imageRef.current, {
					y: -30,
					x: 40,
					rotate: 10,
					ease: "power3.out",
					duration: 0.75,
					delay: "-0.4",
				});
		}
	});

	if (isLoading) return <Loader />;
	if (isError) return <Error />;

	const ebc = beer.ebc ? beer.ebc : 100;
	const hasImage =
		beer.image_url &&
		!beer.image_url.includes("keg.png") &&
		!beer.image_url.includes("cask.png");

	return (
		<>
			<Helmet>
				<title>{beer.name}</title>
				<meta name="title" content={beer.name} />
			</Helmet>
			<Container>
				<section>
					<Header ebc={ebc} ref={headerRef}>
						<div>
							<Name>{beer.name}</Name>
							<Tagline>{removeSentencePeriod(beer.tagline)}</Tagline>
						</div>
						<BubblesWrapper>
							<Bubbles />
						</BubblesWrapper>
						<DetailBoxes>
							<DetailBox ebc={ebc}>
								<CustomAbbr title="Alcohol By Volume">ABV</CustomAbbr>
								<span>{beer.abv}%</span>
							</DetailBox>
							<DetailBox ebc={ebc}>
								<CustomAbbr title="International Bitterness Units">
									IBU
								</CustomAbbr>{" "}
								<span>{beer.ibu}</span>
							</DetailBox>
						</DetailBoxes>
					</Header>
					<Cols>
						<Col width={50}>
							<Description ref={descriptionRef}>
								{beer.description}
							</Description>
						</Col>
						<Col width={35}>
							<table aria-label="Basics" ref={basicsRef}>
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
											{beer.boil_volume.value}{" "}
											{beer.boil_volume.unit}
										</td>
									</tr>
									<tr>
										<th>
											<abbr title="Alcohol By Volume">ABV</abbr>
										</th>
										<td>{beer.abv}%</td>
									</tr>
									<tr>
										<th>
											Target <abbr title="Final Gravity">FG</abbr>
										</th>
										<td>{beer.target_fg}</td>
									</tr>
									<tr>
										<th>
											Target <abbr title="Original Gravity">OG</abbr>
										</th>
										<td>{beer.target_og}</td>
									</tr>
									<tr>
										<th>
											<abbr title="European Brewery Convention (color unit)">
												EBC
											</abbr>
										</th>
										<td>{beer.ebc}</td>
									</tr>
									<tr>
										<th>
											<abbr title="Standard Reference Method (color unit)">
												SRM
											</abbr>
										</th>
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
								<DesktopImage
									src={beer.image_url}
									loading="lazy"
									ref={imageRef}
								/>
							)}
						</Col>
					</Cols>
				</section>

				<section ref={ingredientsRef}>
					<SectionHeading>Ingredients &amp; process</SectionHeading>

					<Cols>
						<Col width={30}>
							<BackgroundGradient>
								<IconHeading>
									<MaltIcon />
									<SubHeading>Malt</SubHeading>
								</IconHeading>
							</BackgroundGradient>
							<table aria-label="Malt ingredients">
								<thead>
									<tr>
										<th>Type</th>
										<th>kg</th>
									</tr>
								</thead>
								<tbody>
									{beer.ingredients.malt.map((row, index) => {
										return (
											<tr key={index}>
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
							<table aria-label="Hops ingredients">
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
									{beer.ingredients.hops.map((row, index) => {
										return (
											<tr key={index}>
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

							<Text>
								<strong>{beer.ingredients.yeast}</strong>
							</Text>
						</Col>
					</Cols>

					<Cols>
						<Col>
							<BackgroundGradient>
								<SubHeading id="method-heading">
									Method &amp; timings
								</SubHeading>
							</BackgroundGradient>
							<table aria-labelledby="method-heading">
								<thead>
									<tr>
										<th>Method</th>
										<th>Temp</th>
										<th>Time</th>
									</tr>
								</thead>
								<tbody>
									{beer.method.mash_temp.map((row, index) => {
										return (
											<tr key={index}>
												<th>Mash temp</th>
												<td>
													{row.temp.value} {row.temp.unit}
												</td>
												{row.duration ? (
													<td>{row.duration} mins</td>
												) : (
													<td>&mdash;</td>
												)}
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

							{beer.method.twist && (
								<TwistText>{beer.method.twist}</TwistText>
							)}
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

				<section ref={foodRef}>
					<SectionHeading id="food-heading">Food pairing</SectionHeading>
					<FoodPairing>
						<RabbitIllustration src="/illustration-rabbit.png" alt="" />
						<FoodList aria-labelledby="food-heading">
							{beer.food_pairing.map((food, index) => {
								return <FoodItem key={index}>{food}</FoodItem>;
							})}
						</FoodList>
					</FoodPairing>
				</section>
			</Container>
		</>
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
	text-align: center;
	min-width: 100px;

	span {
		font-weight: 400;
		display: block;
		font-size: 28px;
	}
`;

const Description = styled.p`
	font-size: 18px;
	line-height: 1.5;

	&:first-letter {
		line-height: 1;
		display: block;
		float: left;
		font-size: 3.75rem;
		margin-right: 0.75rem;
	}

	@media (min-width: 992px) {
		font-size: 20px;
		padding-left: 2rem;
	}
`;

const SectionHeading = styled.h2`
	font-size: 32px;
	margin: 3rem 0 1.5rem;
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
	padding: 1rem 1.5rem 1.5rem;
	margin-right: 9rem;
	margin-left: -0.5rem;
	line-height: 1.4;
	background-color: #5d3d30;
	background: linear-gradient(230deg, #5d3d30, #5d3d301f 90%);
	border-bottom: 6px solid var(--color-background);
	position: relative;
	font-size: 15px;

	@media (min-width: 576px) {
		margin-right: 11rem;
		margin-left: 1rem;
	}

	&:after,
	&:before {
		content: "";
		position: absolute;
		z-index: -1;
	}

	&:after {
		top: 0;
		right: -30px;
		width: 30px;
		height: 30px;
		border-top: 30px solid #5d3d30;
		border-right: 30px solid transparent;
	}

	&:before {
		bottom: 5px;
		left: 5px;
		width: 70%;
		height: 70%;
		background-color: transparent;
		border-bottom: 1px solid var(--color-secondary);
		border-left: 1px solid var(--color-secondary);
		opacity: 0.4;
	}
`;

const TwistText = styled.p`
	padding: 0 1rem 1rem;
	line-height: 1.4;
	font-size: 15px;
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
	right: -40px;
	top: -10px;
	width: 150px;

	@media (min-width: 576px) {
		width: 200px;
		right: -50px;
		top: -50px;
	}
`;

const RabbitIllustration = styled.img`
	position: absolute;
	left: -30px;
	top: -10px;
	width: 150px;

	@media (min-width: 576px) {
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
	padding: 0 0 0 90px;

	@media (min-width: 576px) {
		padding: 0 0 0 120px;
	}
`;

const FoodItem = styled.li`
	padding: 1rem;
	margin: 0.5rem;
	background-color: var(--color-background);
	border: 1px solid rgba(255, 255, 255, 0.25);
	font-size: 15px;
`;

const HideInMobile = styled.span`
	display: none;

	@media (min-width: 576px) {
		display: inline;
	}
`;

const CustomAbbr = styled.abbr`
	border-bottom: 1px dashed currentColor;
`;
export default Beer;
