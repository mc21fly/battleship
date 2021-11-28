import './App.scss';
//Views
import Main from './Views/Main/Main';
import Game from './Views/Game/Game';
import Options from './Views/Options/Options';
import About from './Views/About/About';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes Routes>
      <Route path='/play' element={<Game />} />
      <Route path='/options' element={<Options />} />
      <Route path='/about' element={<About />} />
      <Route path='/' element={<Main />} />
    </Routes>
  );
};

export default App;
