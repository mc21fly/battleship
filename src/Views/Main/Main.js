import './Main.scss';

import { Link } from 'react-router-dom';

const Main = () => {
	return (
		<div className='main'>
			<section>
				<h1>BATTLESHIP</h1>
				<menu>
					<ul>
						<Link to='/play'>
							<li>play</li>
						</Link>
						<Link to='/options'>
							<li>options</li>
						</Link>
						<Link to='/about'>
							<li>about</li>
						</Link>
					</ul>
				</menu>
			</section>

			<footer>
				<div>v 0.1.0</div>
				<div className='gh_link'>
					<a href='https://www.github.com/mc21fly'>github.com/mc21fly</a>
				</div>
			</footer>
		</div>
	);
};

export default Main;
