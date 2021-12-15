import Tile from '../Tile/Tile';
import { BATTLEGROUND_SIZE, NEW_FLEET, MODES, TILE_TYPE } from '../../assets/Constants/Constants';

import { calculateForbiddenTiles, calculateLastForbiddenTiles } from '../../assets/Functions/Functions';

import './Board.scss';
import { useEffect, useState } from 'react/cjs/react.development';

const Board = () => {
	const [mode, setMode] = useState(MODES.PREPARE_MODE);
	const [shipsTiles, setShipsTiles] = useState([]);
	const [forbiddenTiles, setForbiddenTiles] = useState([]);
	const [fleet] = useState(NEW_FLEET);
	const [hits] = useState([]);

	const [shipTemp, setShipTemp] = useState([]);
	const [forbiddenTemp, setForbiddenTemp] = useState([]);
	const [board, setBoard] = useState({
		shipTemp: shipTemp,
		forbiddenTemp: forbiddenTemp,
	});

	const prepareFleet = (tile) => {
		if (isShipTempTile(tile)) {
			removeShipTile(tile);
		} else {
			placeShipTile(tile);
		}
	};

	const placeShipTile = (tile) => {
		const CURRENT_SHIP_SIZE = shipTemp.length;
		const TILE_IS_AVAILABLE = isAvailabe(tile);
		const TILE_IS_ADHERENT = isAdherent(tile);
		const FORBIDDEN_TILES = calculateForbiddenTiles(tile);

		if (CURRENT_SHIP_SIZE === 0 && TILE_IS_AVAILABLE) {
			setShipTemp([...shipTemp, tile]);
			setForbiddenTemp([...forbiddenTemp, FORBIDDEN_TILES]);
		} else if (CURRENT_SHIP_SIZE > 0 && TILE_IS_AVAILABLE && TILE_IS_ADHERENT) {
			setShipTemp([...shipTemp, tile]);
			setForbiddenTemp([...forbiddenTemp, FORBIDDEN_TILES]);
		}
	};

	const removeShipTile = (tile) => {
		const INDEX = shipTemp.sort((a, b) => a - b).indexOf(tile);
		const SHIP_TEMP_LENGTH = shipTemp.length;
		const SHIP_TEMP_LAST_TILE = SHIP_TEMP_LENGTH - 1;

		if (INDEX === 0 || INDEX === SHIP_TEMP_LAST_TILE) {
			const SHIP_TEMP = [...shipTemp];
			const FORBIDDEN_TEMP = [...forbiddenTemp];
			const FORBIDDEN_INDEX = FORBIDDEN_TEMP.findIndex((fraction) => fraction.refers === tile);

			SHIP_TEMP.splice(INDEX, 1);
			FORBIDDEN_TEMP.splice(FORBIDDEN_INDEX, 1);

			setShipTemp(SHIP_TEMP);
			setForbiddenTemp(FORBIDDEN_TEMP);
		}
	};

	const isAvailabe = (tile) => {
		return !isShipTempTile(tile) && !isShipTile(tile) && !isForbiddenTempTile(tile) && !isForbiddenTile(tile);
	};

	const isAdherent = (tile) => {
		const sorted = shipTemp.sort((a, b) => a - b);
		const FIRST_TILE = sorted[0];
		const LAST_TILE = sorted[sorted.length - 1];

		const toFirstTile = () => {
			return (
				tile + 1 === FIRST_TILE ||
				tile - 1 === FIRST_TILE ||
				tile + 10 === FIRST_TILE ||
				tile - 10 === FIRST_TILE
			);
		};

		const toLastTile = () => {
			return (
				tile + 1 === LAST_TILE || tile - 1 === LAST_TILE || tile + 10 === LAST_TILE || tile - 10 === LAST_TILE
			);
		};

		return toFirstTile() || toLastTile();
	};

	const isShipTile = (tile) => {
		return shipsTiles.flat().includes(tile);
	};

	const isShipTempTile = (tile) => {
		return shipTemp.includes(tile);
	};

	const isShipHitTile = (tile) => {
		return hits.includes(tile) && shipsTiles.flat().includes(tile);
	};

	const isWaterHitTile = (tile) => {
		return hits.includes(tile) && !shipsTiles.flat().includes(tile);
	};

	const isForbiddenTile = (tile) => {
		return forbiddenTiles
			.map((fraction) => fraction.forbiddenTiles)
			.flat()
			.includes(tile);
	};

	const isForbiddenTempTile = (tile) => {
		return forbiddenTemp
			.map((fraction) => fraction.forbiddenTiles)
			.flat()
			.includes(tile);
	};

	const getTileType = (tile) => {
		if (isShipHitTile(tile)) return TILE_TYPE.SHIP_HIT;
		if (isShipTile(tile) || isShipTempTile(tile)) return TILE_TYPE.SHIP;
		if (isWaterHitTile(tile)) return TILE_TYPE.WATER_HIT;
		if (isForbiddenTile(tile) || isForbiddenTempTile(tile)) return TILE_TYPE.FORBIDDEN;
		else return TILE_TYPE.WATER;
	};

	const clickHandler = (tile) => {
		switch (mode) {
			case MODES.PREPARE_MODE:
				prepareFleet(tile);
				break;
			case MODES.BATTLE_MODE:
				console.log('Battle mode', tile);
				break;
			default:
				console.log('Default mode', tile);
		}
	};

	const render = () => {
		const tiles = [];

		for (let i = 0; i < BATTLEGROUND_SIZE.ROWS; i++) {
			for (let j = 0; j < BATTLEGROUND_SIZE.COLS; j++) {
				const tileId = parseInt(`${i}${j}`);

				tiles.push(
					<Tile
						key={tileId}
						type={getTileType(tileId)}
						row={i}
						col={j}
						handleClick={() => clickHandler(tileId)}
					/>
				);
			}
		}

		return tiles;
	};

	useEffect(() => {
		const FLEET_SIZE = fleet.length;
		const CURRENT_FLEET_SIZE = shipsTiles.length;

		if (CURRENT_FLEET_SIZE === FLEET_SIZE) {
			setMode(MODES.BATTLE_MODE);
		}
	}, [fleet.length, shipsTiles]);

	useEffect(() => {
		const CURRENT_SHIP_SIZE = shipTemp.length;
		const NEXT_FLEET_SHIP = fleet[shipsTiles.length];
		const PREPARED_SHIP = shipTemp;
		const SHIP_LAST_TILES = calculateLastForbiddenTiles(PREPARED_SHIP);

		if (CURRENT_SHIP_SIZE === NEXT_FLEET_SHIP) {
			setShipsTiles([...shipsTiles, PREPARED_SHIP]);
			setForbiddenTiles([...forbiddenTiles, ...forbiddenTemp, ...SHIP_LAST_TILES]);
			setShipTemp([]);
			setForbiddenTemp([]);
		}
	}, [fleet, forbiddenTemp, forbiddenTiles, shipTemp, shipsTiles]);

	return <div className='board'>{render()}</div>;
};

export default Board;
