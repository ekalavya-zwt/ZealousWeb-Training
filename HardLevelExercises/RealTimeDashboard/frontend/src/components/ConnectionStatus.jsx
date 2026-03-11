function ConnectionStatus({ status }) {
  const color = status === "open" ? "green" : "red";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: color,
        }}
      />
      <span>{status}</span>
    </div>
  );
}

export default ConnectionStatus;
