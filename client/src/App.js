import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="container">
      <Navbar />

      <div className="row mt-4">
        <div className="col-md-6">
          <Login />
        </div>

        <div className="col-md-6">
          <Register />
        </div>
      </div>
    </div>
  );
}

export default App;