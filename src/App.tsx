import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import TopNav from './shared/navbar';
import Home from './screen/home';
// import Resume from './screen/resume';
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <TopNav />
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/resume" element={<Resume/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App
