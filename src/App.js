import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Write from './components/Write';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={ <Write/> }/>
        <Route path='/write' element={ <Write/> }/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
