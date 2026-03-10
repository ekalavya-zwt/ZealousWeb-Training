import SkeletonBox from "./SkeletonBox";

function SkeletonTable({ rows = 5 }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="table-row"
          style={{
            display: "grid",
            gridTemplateColumns: "80px 200px 300px 150px 120px",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <SkeletonBox height="20px" />
          <SkeletonBox height="20px" />
          <SkeletonBox height="20px" />
          <SkeletonBox height="20px" />
          <SkeletonBox height="20px" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonTable;
