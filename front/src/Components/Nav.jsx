import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Nav({ status }) {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <span className="navbar-brand" onClick={goHome}>
                Patark Lietuvai
              </span>
              <div>
                <div className="navbar-nav">
                  {status === 1 || status === 3 ? (
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Home
                    </NavLink>
                  ) : null}
                  {status === 3 ? (
                    <NavLink
                      to="/savivaldybes"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Savivaldybes
                    </NavLink>
                  ) : null}
                  {status === 3 ? (
                    <NavLink
                      to="/sritys"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Sritys
                    </NavLink>
                  ) : null}
                  {status === 3 ? (
                    <NavLink
                      to="/komentarai"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Komentarai
                    </NavLink>
                  ) : null}
                  {status === 3 ? (
                    <NavLink to="/logout" className="nav-link">
                      Logout
                    </NavLink>
                  ) : null}
                  {status === 1 ? (
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  ) : null}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Nav;
