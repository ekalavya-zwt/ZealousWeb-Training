import "./App.css";
import Todo from "./components/Todo";
import { lazy, Suspense } from "react";
import { Routes, Route, NavLink, Form } from "react-router-dom";
import InputFocus from "./components/InputFocus";
// import Counter from "./components/Counter";
import Timer from "./components/Timer";
import TextEditor from "./components/TextEditor";
import Parent from "./components/Parent";
import Users from "./components/Users";
import Accordion from "./components/Accordion";
import Guardian from "./components/Guardian";
const Dashboard = lazy(() => import("./components/Dashboard"));
// const Reports = lazy(() => import("./components/Reports"));
const preloadReports = () => import("./components/Reports");
import ProtectedDashboard from "./pages/ProtectedDashboard";
import ProtectedSalaryReport from "./pages/ProtectedSalaryReport";
import useToast from "./hooks/useToast";
import Counter from "./Zustand/components/Counter";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./routes/ProtectedRoute";
// import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
// import Employees from "./components/Employees";
import { EmployeeForm } from "./components/EmployeeForm";
import EditEmployee from "./components/EditEmployee";
import FetchDummies from "./components/FetchDummies";
import PageSkeleton from "./components/PageSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";
import SkeletonBox from "./skeletons/SkeletonBox";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Layout from "./components/Layout";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Unauthorized from "./components/Unauthorized";
import RoleRoute from "./routes/RoleRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import EmployeeList from "./pages/EmployeeList";
import EmployeeDetail from "./pages/EmployeeDetail";
import DepartmentList from "./pages/DepartmentList";
import Reports from "./pages/Reports";
import Employees from "./pages/Employees";
import UserForm from "./components/UserForm";

function App() {
  // const { addToast } = useToast();

  return (
    <>
      {/* <Todo /> */}
      {/* <InputFocus /> */}
      {/* <Counter /> */}
      {/* <Timer /> */}
      {/* <TextEditor /> */}
      {/* <Parent /> */}
      {/* <Guardian /> */}
      {/* <Users /> */}
      {/* <Accordion allowMultiple>
        <Accordion.Item id="1">
          <Accordion.Body>
            React is a JavaScript library for building UI.
          </Accordion.Body>
          <Accordion.Header>What is React?</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item id="2">
          <Accordion.Header>What is a Hook?</Accordion.Header>
          <Accordion.Body>
            Hooks let you use state and lifecycle features.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      {/* <AuthDashboard /> */}
      {/* <Routes>
        <Route path="/" element={<h2>Homepage</h2>} />
        <Route
          path="/dashboard"
          element={<ProtectedDashboard isLoading={false} />}
        />
        <Route
          path="/salaryReport"
          element={<ProtectedSalaryReport isLoading={false} />}
        />
      </Routes> */}
      <>
        {/* <h1>Toast Notifications</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <button onClick={() => addToast("Employee saved!", "success", 3000)}>
            Success Toast
          </button>
          <button onClick={() => addToast("Failed to delete", "error")}>
            Error Toast
          </button>
          <button onClick={() => addToast("Warning message", "warning")}>
            Warning Toast
          </button>
          <button onClick={() => addToast("Information message")}>
            Info Toast
          </button>
        </div> */}
      </>
      {/* <Counter /> */}
      {/* <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes> */}
      {/* <Routes>
          <Route path="/" element={<EmployeeList />}></Route>
          <Route path="/add" element={<AddEmployee />}></Route>
          <Route path="/edit/:id" element={<EditEmployee />}></Route>
        </Routes> */}
      {/* <Employees />
        <EmployeeForm /> */}
      {/* <FetchDummies /> */}
      {/* <ErrorBoundary>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/reports" onMouseEnter={preloadReports}>
            Reports
          </NavLink>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/reports" element={<Reports />}></Route>
            </Routes>
          </Suspense>
        </ErrorBoundary> */}
      {/* <SkeletonBox /> */}
      {/* <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes> */}
      {/* <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes> */}
      {/* <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
      </Routes> */}
      {/* <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes> */}
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes> */}
      {/* <Routes>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/"
          element={
            <RoleRoute role="user">
              <Dashboard />
            </RoleRoute>
          }
        />
      </Routes> */}
      {/* <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/employees">
            <Route index element={<EmployeeList />} />
            <Route path="/employees/:id" element={<EmployeeDetail />} />
          </Route>
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes> */}
      {/* <Employees /> */}
      <UserForm />
    </>
  );
}

export default App;
