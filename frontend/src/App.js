import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoginByIIN from './components/LoginByIIN';
import Abonents from './components/Abonents';
import PublicMap from './components/PublicMap';
import OverviewPage from './components/OverviewPage';
import Home from './components/Home';
import DebtCheckPage from './components/DebtCheckPage';
import OrganizationStructure from './components/OrganizationStructure';
import ReportsPage from './components/ReportPage';
import ActivityPage from './components/ActivityPage';
import Projects from './components/Completed';
import ProjectPage from './components/ProjectPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/abonents" element={<Abonents/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login-iin" element={<LoginByIIN />} />
        <Route path="/test-map" element={<PublicMap />} />
        <Route path="/overview-page" element={<OverviewPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/debtcheck" element={<DebtCheckPage/>} />
        <Route path="/organization" element={<OrganizationStructure/>} />
        <Route path="/report" element={<ReportsPage/>} />
        <Route path="/activity" element={<ActivityPage/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
