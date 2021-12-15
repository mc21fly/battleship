import { EDGES, CORNERS } from './Constants/Constants';
import { isEdgeTile } from './Functions/Functions';
import Fraction from './Fraction';

class Ship {
	constructor(size) {
		this.size = size;
		this.coords = [];
		this.forbidden = [];
		this.currentSize = this.coords.length;
	}

	placeOn(tile) {
		const SHIP_SIZE = this.coords.length;
		const CONSTRUCTION_SIZE = this.size;

		if (typeof tile === 'number' && SHIP_SIZE !== CONSTRUCTION_SIZE) {
			this.coords.push(tile);
			this.forbidden.push(this.calculateForbiddenTiles(tile));
		}
	}

	calculateForbiddenTiles(tile) {
		const TILE_LAYS_ON_EDGE = isEdgeTile(tile);

		if (TILE_LAYS_ON_EDGE) {
			if (EDGES.LEFT.includes(tile)) {
				return new Fraction(tile, [tile - (10 - 1), tile + (10 + 1)]);
			}

			if (EDGES.RIGHT.includes(tile)) {
				return new Fraction(tile, [tile + (10 - 1), tile - (10 + 1)]);
			}
		} else {
			switch (tile) {
				case CORNERS.TOP_LEFT:
					return new Fraction(tile, [11]);
				case CORNERS.TOP_RIGHT:
					return new Fraction(tile, [18]);
				case CORNERS.BOTTOM_LEFT:
					return new Fraction(tile, [81]);
				case CORNERS.BOTTOM_RIGHT:
					return new Fraction(tile, [88]);
				default:
					return new Fraction(tile, [tile - (10 - 1), tile + (10 - 1), tile - (10 + 1), tile + (10 + 1)]);
			}
		}
	}
}

export default Ship;
