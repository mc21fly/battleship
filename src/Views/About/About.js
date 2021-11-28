import './About.scss';

import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section>
            <header>
                <Link to='/'>
                    <i className='fas fa-arrow-left'></i>
                </Link>{' '}
				about
			</header>
        </section>
    );
};

export default About;
