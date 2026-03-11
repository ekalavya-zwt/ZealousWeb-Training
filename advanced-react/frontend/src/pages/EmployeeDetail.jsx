import { useParams, useOutletContext } from "react-router-dom";

function EmployeeDetail() {
  const { id } = useParams();
  const { currentUser } = useOutletContext();

  return (
    <div>
      <h3>Employee</h3>
      <p style={{ marginTop: "5px" }}>Employee ID: {id}</p>
      <p style={{ marginTop: "5px" }}>Logged in as: {currentUser.name}</p>
    </div>
  );
}

export default EmployeeDetail;
