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
