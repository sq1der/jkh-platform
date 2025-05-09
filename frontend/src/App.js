import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoginByIIN from './components/LoginByIIN';
import Abonents from './components/Abonents';
import OverviewPage from './components/OverviewPage';
import Home from './components/Home';
import DebtCheckPage from './components/DebtCheckPage';
import OrganizationStructure from './components/OrganizationStructure';
import ReportsPage from './components/ReportPage';
import ActivityPage from './components/ActivityPage';
import Projects from './components/Completed';
import ProjectPage from './components/ProjectPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/abonents" element={<Abonents/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login-iin" element={<LoginByIIN />} />
        <Route path="/overview-page" element={<OverviewPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/debtcheck" element={<DebtCheckPage/>} />
        <Route path="/organization" element={<OrganizationStructure/>} />
        <Route path="/report" element={<ReportsPage/>} />
        <Route path="/activity" element={<ActivityPage/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
