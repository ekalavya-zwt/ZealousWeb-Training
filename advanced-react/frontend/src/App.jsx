import "./App.css";
import Todo from "./components/Todo";
import { lazy, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import InputFocus from "./components/InputFocus";
// import Counter from "./components/Counter";
import Timer from "./components/Timer";
import TextEditor from "./components/TextEditor";
import Parent from "./components/Parent";
import Users from "./components/Users";
import Accordion from "./components/Accordion";
import Guardian from "./components/Guardian";
const Dashboard = lazy(() => import("./components/Dashboard"));
const Reports = lazy(() => import("./components/Reports"));
const preloadReports = () => import("./components/Reports");
import ProtectedDashboard from "./pages/ProtectedDashboard";
import ProtectedSalaryReport from "./pages/ProtectedSalaryReport";
import useToast from "./hooks/useToast";
import Counter from "./Zustand/components/Counter";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./routes/ProtectedRoute";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import Employees from "./components/Employees";
import { EmployeeForm } from "./components/EmployeeForm";
import EditEmployee from "./components/EditEmployee";
import FetchDummies from "./components/FetchDummies";
import PageSkeleton from "./components/PageSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";
import SkeletonBox from "./skeletons/SkeletonBox";

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
      </>
    </>
  );
}

export default App;
