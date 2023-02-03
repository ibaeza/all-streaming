import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddAccount from './accounts/AddAccount';
import AddType from './types/AddType';
import EditAccount from './accounts/EditAccount';
import ViewAccount from './accounts/ViewAccount';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/addAccount" element={<AddAccount />}></Route>
          <Route exact path="/addType" element={<AddType />}></Route>
          <Route exact path="/editAccount/:id" element={<EditAccount />}></Route>
          <Route exact path="/viewAccount/:id" element={<ViewAccount />}></Route>
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
