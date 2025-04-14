import './App.css'
import OnboardForm from './components/onboardForm/OnboardForm'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Themes from './components/Themes/Themes';
import ThemePage from './components/ThemePage/ThemePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import RegistrationPage from './components/Register/Register';
import { UserProvider } from './UserContext';
import PrivateRoute from './PrivateRoute';
import Home from './components/Home/Home';
import BulkMail from './components/BulkMail/BulkMail';
// import AlertMessage from './components/AlertMessage/AlertMessage';
// import { useUser } from './UserContext';
import SalesOrderForm from './components/Sales/SalesOrderForm';
import SalesOverview from './components/Sales/SalesOverview';
import SalesReports from './components/Sales/SalesReports';
import OrderDetails from './components/Sales/OrderDetails';
import ProductMaster from './components/Masters/Products/Products';
import UpdateSalesOrder from './components/Sales/UpdateSalesOrder';

function App() {
  // const { user } = useUser();

  return (
    <>
      <Router>
        <UserProvider>
          <Navbar />
          {/* {user?.status === "Registered" ?
            <AlertMessage message="hi this is a warning message" /> : ''} */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/onboard" element={<PrivateRoute element={<OnboardForm />} />} />
            <Route path="/themes" element={<PrivateRoute element={<Themes />} />} />
            <Route path="/theme/:themeId" element={<PrivateRoute element={<ThemePage />} />} />
            <Route path='/create-sale' element={<SalesOrderForm />} />
            <Route path="/sales-overview" element={<SalesOverview />} />
            <Route path="/sales-reports" element={<SalesReports />} />
            {/* <Route path="/capture" element={<CaptureImage />} /> */}
            <Route path="/sales-orders/:orderNumber" element={<OrderDetails />} />
            <Route path='/masters-products' element={<ProductMaster />} />
            <Route path='/sales-orders-update/:orderNumber' element={<UpdateSalesOrder />} />

            <Route path="/mail" element={<BulkMail />} />
          </Routes>
          <ToastContainer />
        </UserProvider>
      </Router>
    </>
  )
}

export default App
