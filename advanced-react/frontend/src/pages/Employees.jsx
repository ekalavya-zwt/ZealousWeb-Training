import { useSearchParams } from "react-router-dom";

function Employees() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const deptId = searchParams.get("deptId") || "";
  const page = searchParams.get("page") || 1;

  const handleSearchChange = (e) => {
    setSearchParams({
      search: e.target.value,
      deptId,
      page: 1,
    });
  };

  const handleDeptChange = (e) => {
    setSearchParams({
      search,
      deptId: e.target.value,
      page: 1,
    });
  };

  const goToPage = (newPage) => {
    setSearchParams({
      search,
      deptId,
      page: newPage,
    });
  };

  return (
    <div>
      <h2>Employee</h2>
      <p>Search: {search}</p>
      <p>Department: {deptId}</p>
      <p>Page: {page}</p>

      <label>Search: </label>
      <input
        value={search}
        onChange={handleSearchChange}
        placeholder="Search employee"
      />

      <br />
      <br />

      <h2>Departments</h2>

      <label>Department: </label>
      <select value={deptId} onChange={handleDeptChange}>
        <option value="">All</option>
        <option value="1">Engineering</option>
        <option value="2">Marketing</option>
        <option value="3">Sales</option>
        <option value="4">HR</option>
      </select>

      <br />
      <br />

      <button onClick={() => goToPage(Number(page) - 1)}>Prev</button>
      <button onClick={() => goToPage(Number(page) + 1)}>Next</button>
    </div>
  );
}

export default Employees;
