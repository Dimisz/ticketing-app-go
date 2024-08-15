import { Outlet } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import { NavItem } from './models/NavItem';
import { Link } from 'react-router-dom';

const navLinks: NavItem[] = [
  { label: 'Home', link: '/' },
  { label: 'Movies', link: '/movies' },
  { label: 'Genres', link: '/genres' },
  { label: 'Add Movie', link: '/admin/movie/0' },
  { label: 'Manage Catalog', link: '/admin' },
  { label: 'GraphQL', link: '/graphql' },
];

export default function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="mt-3">Go Watch a Movie!</h1>
          </div>
          <div className="col text-end">
            <Link to="/login">
              <span className="badge bg-success">Log In</span>
            </Link>
          </div>
          <hr className="mb-3"></hr>
        </div>

        <div className="row">
          <div className="col-md-2">
            <NavBar links={navLinks} />
          </div>
          <div className="col-md-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
