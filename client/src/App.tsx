import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import { NavItem } from './models/NavItem';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Alert from './components/alerts/Alert';

const navLinks: NavItem[] = [
  { label: 'Home', link: '/', requiresAuth: false },
  { label: 'Movies', link: '/movies', requiresAuth: false },
  { label: 'Genres', link: '/genres', requiresAuth: false },
  { label: 'Add Movie', link: '/admin/movie/0', requiresAuth: true },
  { label: 'Manage Catalog', link: '/admin', requiresAuth: true },
  { label: 'GraphQL', link: '/graphql', requiresAuth: false },
];

export default function App() {
  const [jwtToken, setJwtToken] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertClassName, setAlertClassName] = useState<string>('d-none');

  const navigate = useNavigate();

  const logOut = () => {
    setJwtToken('');
    navigate('/login');
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="mt-3">Go Watch a Movie!</h1>
          </div>
          <div className="col text-end">
            {jwtToken === '' ? (
              <Link to="/login">
                <span className="badge bg-success">Log In</span>
              </Link>
            ) : (
              <a href="#" onClick={logOut}>
                <span className="badge bg-danger">Logout</span>
              </a>
            )}
          </div>
          <hr className="mb-3"></hr>
        </div>

        <div className="row">
          <div className="col-md-2">
            <NavBar links={navLinks} jwtToken={jwtToken} />
          </div>
          <div className="col-md-10">
            <Alert alertClassName={alertClassName} message={alertMessage} />
            <Outlet
              context={{
                jwtToken,
                setJwtToken,
                setAlertClassName,
                setAlertMessage,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
