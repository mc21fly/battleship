import './Options.scss';

import { Link } from 'react-router-dom';

const Options = () => {
    return (
        <section>
            <header>
                <Link to='/'>
                    <i className='fas fa-arrow-left'></i>
                </Link>
                options
            </header>
        </section>
    );
};

export default Options;
