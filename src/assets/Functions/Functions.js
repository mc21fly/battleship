import { EDGES, CORNERS } from '../Constants/Constants';
import Forbidden from '../Forbidden';

export function isEdgeTile(tile) {
	return EDGES.LEFT.includes(tile) || EDGES.RIGHT.includes(tile);
}

export function laysOnRightEdge(tile) {
	return EDGES.RIGHT.includes(tile);
}

export function laysOnLeftEdge(tile) {
	return EDGES.LEFT.includes(tile);
}

export function calculateForbiddenTiles(tile) {
	const TILE_LAYS_ON_EDGE = isEdgeTile(tile);
	const TILE_LAYS_ON_LEFT_EDGE = laysOnLeftEdge(tile);
	const TILE_LAYS_ON_RIGHT_EDGE = laysOnRightEdge(tile);

	if (TILE_LAYS_ON_EDGE) {
		if (TILE_LAYS_ON_LEFT_EDGE) {
			return new Forbidden(tile, [tile - (10 - 1), tile + (10 + 1)]);
		}

		if (TILE_LAYS_ON_RIGHT_EDGE) {
			return new Forbidden(tile, [tile + (10 - 1), tile - (10 + 1)]);
		}
	} else {
		switch (tile) {
			case CORNERS.TOP_LEFT:
				return new Forbidden(tile, [11]);
			case CORNERS.TOP_RIGHT:
				return new Forbidden(tile, [18]);
			case CORNERS.BOTTOM_LEFT:
				return new Forbidden(tile, [81]);
			case CORNERS.BOTTOM_RIGHT:
				return new Forbidden(tile, [88]);
			default:
				return new Forbidden(tile, [tile - (10 - 1), tile + (10 - 1), tile - (10 + 1), tile + (10 + 1)]);
		}
	}
}

export function calculateLastForbiddenTiles(ship) {
	const sorted = ship.sort((a, b) => a - b);
	const SHIP_FIRST_TILE = 0;
	const SHIP_LAST_TILE = sorted.length - 1;
	const LAST_TILES = [];

	const getTiles = (tile) => {
		const TILE_LAYS_ON_EDGE = isEdgeTile(tile);
		const TILE_LAYS_ON_LEFT_EDGE = laysOnLeftEdge(tile);
		const TILE_LAYS_ON_RIGHT_EDGE = laysOnRightEdge(tile);

		if (TILE_LAYS_ON_EDGE) {
			if (TILE_LAYS_ON_LEFT_EDGE) {
				return sorted.length > 1
					? new Forbidden(tile, [tile + 10, tile - 10])
					: new Forbidden(tile, [tile + 1, tile + 10, tile - 10]);
			}

			if (TILE_LAYS_ON_RIGHT_EDGE) {
				return sorted.length > 1
					? new Forbidden(tile, [tile + 10, tile - 10])
					: new Forbidden(tile, [tile - 1, tile + 10, tile - 10]);
			}
		} else {
			switch (tile) {
				case CORNERS.TOP_LEFT:
					return sorted.length > 1
						? new Forbidden(tile, [])
						: new Forbidden(tile, [tile + 1, tile + 10, tile + (10 + 1)]);
				case CORNERS.TOP_RIGHT:
					return sorted.length > 1
						? new Forbidden(tile, [])
						: new Forbidden(tile, [tile - 1, tile + 10, tile + (10 - 1)]);
				case CORNERS.BOTTOM_LEFT:
					return sorted.length > 1
						? new Forbidden(tile, [])
						: new Forbidden(tile, [tile + 1, tile - 10, tile - (10 + 1)]);
				case CORNERS.BOTTOM_RIGHT:
					return sorted.length > 1
						? new Forbidden(tile, [])
						: new Forbidden(tile, [tile - 1, tile + 10, tile + (10 - 1)]);
				default:
					return new Forbidden(tile, [tile - 1, tile + 1, tile - 10, tile + 10]);
			}
		}
	};

	sorted.forEach((tile, index) => {
		if (index === SHIP_FIRST_TILE || index === SHIP_LAST_TILE) {
			LAST_TILES.push(getTiles(tile));
		}
	});

	return LAST_TILES;
}
