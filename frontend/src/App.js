import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoginByIIN from './components/LoginByIIN';
import Abonents from './components/Abonents';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/abonents" element={<Abonents/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login-iin" element={<LoginByIIN />} />
      </Routes>
    </Router>
  );
};

export default App;
