import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";
import PublicRoute from "./routes/PublicRoute";
import CustomThemeProvider from "./components/CustomThemeProvider";
import EmployeesList from "./pages/EmployeesList";
import CreateEmployee from "./pages/createEmployee";
import UpdateEmployee from "./pages/updateEmployee";
import ToastContainer from "./components/ToastContainer";
import SalaryReport from "./pages/SalaryReport";

function App() {
  return (
    <>
      <CustomThemeProvider>
        <ToastContainer />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeesList />} />
              <Route path="/report" element={<SalaryReport />} />
              <Route path="/employees/add" element={<CreateEmployee />} />
              <Route path="/employees/edit/:id" element={<UpdateEmployee />} />
            </Route>
          </Route>
        </Routes>
      </CustomThemeProvider>
    </>
  );
}

export default App;
