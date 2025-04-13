import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoginByIIN from './components/LoginByIIN';
import Abonents from './components/Abonents';
import PublicMap from './components/PublicMap';
import OverviewPage from './components/OverviewPage';
import SidebarMenu from './components/SidebarMenu';
import Home from './components/Home';
import DebtCheckPage from './components/DebtCheckPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/abonents" element={<Abonents/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login-iin" element={<LoginByIIN />} />
        <Route path="/test-map" element={<PublicMap />} />
        <Route path="/overview-page" element={<OverviewPage />} />
        <Route path="/sidebar-menu" element={<SidebarMenu />} />
        <Route path="/home-page" element={<Home />} />
        <Route path="/debtcheck" element={<DebtCheckPage/>} />
        
      </Routes>
    </Router>
  );
};

export default App;
