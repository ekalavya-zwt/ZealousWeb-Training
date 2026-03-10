import SkeletonBox from "./SkeletonBox";

function SkeletonEmployeeCard() {
  return (
    <div className="employee-card">
      <SkeletonBox width="60%" height="20px" />

      <div style={{ marginTop: "10px" }}>
        <SkeletonBox width="80%" height="14px" />
      </div>

      <div style={{ marginTop: "10px" }}>
        <SkeletonBox width="40%" height="14px" />
      </div>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <SkeletonBox width="80px" height="30px" borderRadius="6px" />
        <SkeletonBox width="80px" height="30px" borderRadius="6px" />
      </div>
    </div>
  );
}

export default SkeletonEmployeeCard;
