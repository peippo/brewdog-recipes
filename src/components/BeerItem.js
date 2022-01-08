import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getBeerColor, removeSentencePeriod } from "../utils";

const BeerItem = ({ beer, index }) => {
	const ebc = beer.ebc ? beer.ebc : 100;
	const hasImage =
		beer.image_url &&
		!beer.image_url.includes("keg.png") &&
		!beer.image_url.includes("cask.png");

	const itemRef = useRef();

	useEffect(() => {
		gsap.to(itemRef.current, {
			opacity: 1,
			delay: 0.4,
			stagger: () => index * 0.01,
			ease: "power2.out",
		});
	}, []);

	return (
		<Item ebc={ebc} ref={itemRef}>
			<StyledLink to={`/beer/${beer.id}`} ebc={ebc}>
				<Flex>
					<Name>{beer.name}</Name>
					<Abv>{beer.abv}%</Abv>
				</Flex>
				<Tagline>{removeSentencePeriod(beer.tagline)}</Tagline>

				{hasImage && <Image src={beer.image_url} loading="lazy" alt="" />}
			</StyledLink>
		</Item>
	);
};

const Item = styled.li`
	padding: 1.25rem 70px 1.25rem 1.25rem;
	color: ${(props) => (props.ebc > 25 ? "#ffffff" : "#000000")};
	background-color: ${(props) => getBeerColor(props.ebc)};
	overflow: hidden;
	position: relative;
	transition: all 0.5s;
	border-radius: 5px;
	opacity: 0;

	&:hover {
		overflow: visible;
		z-index: 10;
		transform: scale(1.05);
		box-shadow: 0 30px 40px -20px rgb(0 0 0 / 40%);

		img {
			transform: translateY(-75%) rotate(5deg) translateZ(0);
			filter: drop-shadow(10px 5px 5px rgba(32, 20, 20, 0.5));
		}
	}
`;

const StyledLink = styled(Link)`
	color: ${(props) => (props.ebc > 25 ? "#ffffff" : "#000000")};
	text-decoration: none;

	&:after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	&:focus {
		outline: 0;

		h2 {
			text-decoration: underline;
		}
	}

	&:focus:not(:focus-visible) {
		h2 {
			text-decoration: none;
		}
	}
`;

const Flex = styled.div`
	display: flex;
	align-items: center;
`;

const Name = styled.h2`
	margin: 0;
	font-size: 28px;
	line-height: 1;
`;

const Tagline = styled.p`
	margin-top: 0;
`;

const Abv = styled.span`
	font-family: var(--font-family-heading);
	font-size: 20px;
	padding-left: 0.75rem;
	margin-left: 0.75rem;
	opacity: 0.75;
	border-left: 2px solid rgba(255, 255, 255, 0.5);
`;

const Image = styled.img`
	position: absolute;
	right: -10px;
	transform: translateY(-80%) translateZ(0);
	width: 70px;
	transition: all 0.5s;
	-webkit-transform-style: preserve-3d;
`;

export default BeerItem;
