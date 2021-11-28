import { useState } from 'react';
import './Tiles.scss';

import Tile from '../Tile/Tile';

const Tiles = ({ battlegroundId }) => {
	const [ships, setShips] = useState([]);

	const handlePlace = (tileId) => {
		const next = tileId;
		const sorted = ships.sort((a, b) => a - b);

		if (ships.length < 4) {
			if (ships.length === 0) {
				setShips([...ships, next]);
			} else if (ships.length === 1) {
				const first = sorted[0];

				if (
					first + 1 === next ||
					first - 1 === next ||
					first + 10 === next ||
					first - 10 === next
				) {
					setShips([...ships, next]);
				}
			} else {
				const first = sorted[0];
				const second = sorted[1];
				const last = sorted[sorted.length - 1];

				if (first - second === -1) {
					if (first - 1 === next || last + 1 === next) {
						setShips([...ships, next]);
					}
				}

				if (first - second === -10) {
					if (first - 10 === next || last + 10 === next) {
						setShips([...ships, next]);
					}
				}
			}
		}
	};

	const renderTiles = () => {
		const tiles = [];

		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				const tileId = parseInt(`${i}${j}`);

				tiles.push(
					<Tile
						key={tileId}
						row={i}
						col={j}
						isPartOfAShip={ships.includes(tileId)}
						placeShip={(tile) => handlePlace(tile)}
					/>
				);
			}
		}

		return tiles;
	};

	return <div className='tiles'>{renderTiles()}</div>;
};

export default Tiles;
