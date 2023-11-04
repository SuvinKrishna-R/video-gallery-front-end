import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import Home from './page/Home';
import History from './page/History';
import Rough from './page/Rough';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
          <Route path='' element={<LandingPage></LandingPage>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/watch-history' element={<History></History>}></Route>
          <Route path='/rough' element={<Rough></Rough>}></Route>


      </Routes>

      <Footer></Footer>
      
    </div>
  );
}

export default App;
