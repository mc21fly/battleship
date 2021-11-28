import Tiles from '../Tiles/Tiles';
import './Battleground.scss';

const Battleground = ({ id }) => {
	return (
		<div className='battleground'>
			<div className='battleground__wrapper'>
				<div className='corner' />

				<div className='row'>
					<div className='row__number'>A</div>
					<div className='row__number'>B</div>
					<div className='row__number'>C</div>
					<div className='row__number'>D</div>
					<div className='row__number'>E</div>
					<div className='row__number'>F</div>
					<div className='row__number'>G</div>
					<div className='row__number'>H</div>
					<div className='row__number'>I</div>
					<div className='row__number'>J</div>
				</div>
			</div>

			<div className='battleground__wrapper'>
				<div className='col'>
					<div className='col__number'>1</div>
					<div className='col__number'>2</div>
					<div className='col__number'>3</div>
					<div className='col__number'>4</div>
					<div className='col__number'>5</div>
					<div className='col__number'>6</div>
					<div className='col__number'>7</div>
					<div className='col__number'>8</div>
					<div className='col__number'>9</div>
					<div className='col__number'>10</div>
				</div>

				<Tiles battlegroundId={id} />
			</div>
		</div>
	);
};

export default Battleground;
