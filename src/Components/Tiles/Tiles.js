import './Tiles.scss';

import Tile from '../Tile/Tile';
import { useState, useEffect, useCallback } from 'react';
import {
	BATTLEGROUND_SIZE,
	BATTLE_MODE,
	NEW_FLEET,
	PREPARE_MODE,
	TILE_TYPE,
	CORNERS,
	EDGES,
} from '../../assets/Constants/Constants';

const Tiles = () => {
	const [mode, setMode] = useState(PREPARE_MODE);
	const [shipsTiles, setShipsTiles] = useState([]);
	const [forbiddenTiles, setForbiddenTiles] = useState([]);
	const [hits] = useState([]);
	const [fleet] = useState(NEW_FLEET);

	const [shipTemp, setShipTemp] = useState([]);
	const [forbiddenTemp, setForbiddenTemp] = useState([]);

	const handleClick = (tileId) => {
		switch (mode) {
			case PREPARE_MODE:
				prepareFleet(tileId);
				break;
			case BATTLE_MODE:
				battle(tileId);
				break;
			default:
				console.log('Default mode', tileId);
		}
	};

	const prepareFleet = (tileId) => {
		const CURRENT_SHIP = shipTemp.sort((a, b) => a - b);
		const CURRENT_SHIP_SIZE = CURRENT_SHIP.length;
		const CLICKED_TILE = tileId;
		const FORBIDDEN_TILES = calculateForbiddenTiles(tileId);
		const TILE_IS_AVAILABLE = isAvailabe(tileId);
		const TILE_IS_ADHERENT = isAdherent(tileId);
		const TILE_IS_CLICKED = shipTemp.includes(tileId);

		if (
			TILE_IS_CLICKED &&
			(CURRENT_SHIP[0] === CLICKED_TILE || CURRENT_SHIP[CURRENT_SHIP_SIZE - 1] === CLICKED_TILE)
		) {
			const CURRENT_SHIP_COPY = [...CURRENT_SHIP];
			const INDEX = CURRENT_SHIP_COPY.indexOf(tileId);
			CURRENT_SHIP_COPY.splice(INDEX, 1);

			setShipTemp(CURRENT_SHIP_COPY);
		} else if (CURRENT_SHIP_SIZE === 0 && TILE_IS_AVAILABLE) {
			setShipTemp([...shipTemp, CLICKED_TILE]);
			setForbiddenTemp([...forbiddenTemp, ...FORBIDDEN_TILES]);
		} else if (CURRENT_SHIP_SIZE > 0 && TILE_IS_AVAILABLE && TILE_IS_ADHERENT) {
			setShipTemp([...shipTemp, CLICKED_TILE]);
			setForbiddenTemp([...forbiddenTemp, ...FORBIDDEN_TILES]);
		}
		console.log(shipTemp);
	};

	const battle = (tileId) => {
		console.log('battle', tileId);
	};

	const calculateForbiddenTiles = (tileId) => {
		const TILE = tileId;
		const TILE_LAYS_ON_EDGE = isEdgeTile(TILE);

		if (TILE_LAYS_ON_EDGE) {
			if (EDGES.LEFT.includes(TILE)) {
				return [TILE - (10 - 1), TILE + (10 + 1)];
			}

			if (EDGES.RIGHT.includes(TILE)) {
				return [TILE + (10 - 1), TILE - (10 + 1)];
			}
		} else {
			switch (TILE) {
				case CORNERS.TOP_LEFT:
					return [11];
				case CORNERS.TOP_RIGHT:
					return [18];
				case CORNERS.BOTTOM_LEFT:
					return [81];
				case CORNERS.BOTTOM_RIGHT:
					return [88];
				default:
					return [TILE - (10 - 1), TILE + (10 - 1), TILE - (10 + 1), TILE + (10 + 1)];
			}
		}

		// TODO Zrobić tak, żeby się nie powtarzały
	};

	const calculateLastForbiddenTiles = useCallback(() => {
		const sorted = shipTemp.sort((a, b) => a - b);
		const SHIP_FIRST_TILE = sorted[0];
		const SHIP_LAST_TILE = sorted[sorted.length - 1];

		return [
			SHIP_FIRST_TILE + 1,
			SHIP_FIRST_TILE - 1,
			SHIP_FIRST_TILE + 10,
			SHIP_FIRST_TILE - 10,
			SHIP_LAST_TILE + 1,
			SHIP_LAST_TILE - 1,
			SHIP_LAST_TILE + 10,
			SHIP_LAST_TILE - 10,
		];
	}, [shipTemp]);

	const isEdgeTile = (tileId) => {
		const TILE = tileId;

		return EDGES.LEFT.includes(TILE) || EDGES.RIGHT.includes(TILE);
	};

	const isAdherent = (tileId) => {
		const sorted = shipTemp.sort((a, b) => a - b);
		const FIRST_TILE = sorted[0];
		const LAST_TILE = sorted[sorted.length - 1];

		const toFirstTile = () => {
			return (
				tileId + 1 === FIRST_TILE ||
				tileId - 1 === FIRST_TILE ||
				tileId + 10 === FIRST_TILE ||
				tileId - 10 === FIRST_TILE
			);
		};

		const toLastTile = () => {
			return (
				tileId + 1 === LAST_TILE ||
				tileId - 1 === LAST_TILE ||
				tileId + 10 === LAST_TILE ||
				tileId - 10 === LAST_TILE
			);
		};

		return toFirstTile() || toLastTile();
	};

	const isShip = (tileId) => {
		return shipTemp.includes(tileId) || shipsTiles.flat().includes(tileId);
	};

	const isShipHit = (tileId) => {
		return hits.includes(tileId) && shipsTiles.flat().includes(tileId);
	};

	const isWaterHit = (tileId) => {
		return hits.includes(tileId) && !shipsTiles.flat().includes(tileId);
	};

	const isForbidden = (tileId) => {
		return forbiddenTemp.includes(tileId) || forbiddenTiles.includes(tileId);
	};

	const isAvailabe = (tileId) => {
		return (
			!shipTemp.includes(tileId) &&
			!shipsTiles.includes(tileId) &&
			!forbiddenTemp.includes(tileId) &&
			!forbiddenTiles.includes(tileId)
		);
	};

	const getType = (tileId) => {
		if (isShipHit(tileId)) return TILE_TYPE.SHIP_HIT;
		if (isShip(tileId)) return TILE_TYPE.SHIP;
		if (isWaterHit(tileId)) return TILE_TYPE.WATER_HIT;
		if (isForbidden(tileId)) return TILE_TYPE.FORBIDDEN;
		else return TILE_TYPE.WATER;
	};

	const render = () => {
		const tiles = [];

		for (let i = 0; i < BATTLEGROUND_SIZE; i++) {
			for (let j = 0; j < BATTLEGROUND_SIZE; j++) {
				const tileId = parseInt(`${i}${j}`);

				tiles.push(
					<Tile key={tileId} type={getType(tileId)} row={i} col={j} handleClick={() => handleClick(tileId)} />
				);
			}
		}

		return tiles;
	};

	useEffect(() => {
		const FLEET_SIZE = fleet.length;
		const CURRENT_FLEET_SIZE = shipsTiles.length;

		if (CURRENT_FLEET_SIZE === FLEET_SIZE) {
			setMode(BATTLE_MODE);
		}
	}, [fleet.length, shipsTiles]);

	useEffect(() => {
		const CURRENT_SHIP_LENGTH = shipTemp.length;
		const PLACED_SHIP_LENGTH = fleet[shipsTiles.length];
		const PREPARED_SHIP = shipTemp;
		const SHIP_LAST_TILES = calculateLastForbiddenTiles();

		if (CURRENT_SHIP_LENGTH === PLACED_SHIP_LENGTH) {
			setShipsTiles([...shipsTiles, PREPARED_SHIP]);
			setForbiddenTiles([...forbiddenTiles, ...forbiddenTemp, ...SHIP_LAST_TILES]);
			setShipTemp([]);
			setForbiddenTemp([]);
		}
		// eslint-disable-next-line no-use-before-define
	}, [calculateLastForbiddenTiles, fleet, forbiddenTemp, forbiddenTiles, shipTemp, shipsTiles]);

	return <div className='tiles'>{render()}</div>;
};

export default Tiles;
