import { Link } from 'react-router-dom';
import { NavItem } from '../../models/NavItem';

interface NavBarProps {
  links: NavItem[];
  jwtToken: string;
}

export default function NavBar({ links, jwtToken }: NavBarProps) {
  const renderedLinks = links.map((link) => {
    if (!link.requiresAuth || (link.requiresAuth && jwtToken !== '')) {
      return (
        <Link
          key={link.link}
          to={link.link}
          className="list-group-item list-group-item-action"
        >
          {link.label}
        </Link>
      );
    }
  });

  return (
    <nav>
      <div className="list-group">{renderedLinks}</div>
    </nav>
  );
}
