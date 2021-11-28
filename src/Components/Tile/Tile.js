import './Tile.scss';

const Tile = ({ row, col, isPartOfAShip, placeShip }) => {
	const tileId = parseInt(`${row}${col}`);

	return (
		<div
			onClick={() => placeShip(tileId)}
			id={tileId}
			className={`tiles--tile row--${row + 1} col--${col + 1} ${
				isPartOfAShip ? 'ship' : ''
			}`}
		/>
	);
};

export default Tile;
