import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div style={{ margin: "10px 0" }}>
      <Link to="/">dashboard</Link>

      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");

        return (
          <span key={to}>
            {" / "}
            <Link to={to}>{value}</Link>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
