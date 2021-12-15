import './Tile.scss';

const Tile = ({ row, col, type, handleClick }) => {
	// const tileId = parseInt(`${row}${col}`);

	return (
		<div className='tile' data-type={type} data-row={row} data-col={col} onClick={handleClick}>
			{/* {tileId} */}
		</div>
	);
};

export default Tile;
