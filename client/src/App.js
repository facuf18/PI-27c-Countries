import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Countries from './components/Countries/Countries';
import CountryDetail from './components/CountryDetail/CountryDetail';
import ActivityForm from './components/ActivityForm/ActivityForm';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/countries' element={<Countries />}/>
        <Route path='/countries/:id' element={<CountryDetail />} />
        <Route path='/activities' element={<ActivityForm />} />
      </Routes>
    </div>
  );
}