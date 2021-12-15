// import Tiles from '../Tiles/Tiles';
import Board from '../Board/Borad';
import './Battleground.scss';

const Battleground = ({ id }) => {
	return (
		<div className='battleground'>
			<div className='battleground__wrapper'>
				<div className='corner' />

				<div className='letters'>
					<div className='letters__item'>A</div>
					<div className='letters__item'>B</div>
					<div className='letters__item'>C</div>
					<div className='letters__item'>D</div>
					<div className='letters__item'>E</div>
					<div className='letters__item'>F</div>
					<div className='letters__item'>G</div>
					<div className='letters__item'>H</div>
					<div className='letters__item'>I</div>
					<div className='letters__item'>J</div>
				</div>
			</div>

			<div className='battleground__wrapper'>
				<div className='numbers'>
					<div className='numbers__item'>1</div>
					<div className='numbers__item'>2</div>
					<div className='numbers__item'>3</div>
					<div className='numbers__item'>4</div>
					<div className='numbers__item'>5</div>
					<div className='numbers__item'>6</div>
					<div className='numbers__item'>7</div>
					<div className='numbers__item'>8</div>
					<div className='numbers__item'>9</div>
					<div className='numbers__item'>10</div>
				</div>

				<Board />
			</div>
		</div>
	);
};

export default Battleground;
