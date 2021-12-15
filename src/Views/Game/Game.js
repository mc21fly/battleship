import './Game.scss';

import { Link } from 'react-router-dom';

import Battleground from '../../Components/Battleground/Battleground';

const Game = () => {
	return (
		<section>
			<header>
				<Link to='/'>
					<i className='fas fa-arrow-left'></i>
				</Link>{' '}
				battleship
			</header>

			<div className='game__wrapper'>
				<Battleground id={0} />
				<Battleground id={1} />
			</div>
		</section>
	);
};

export default Game;
