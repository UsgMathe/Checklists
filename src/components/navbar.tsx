import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed z-10 top-0 w-full bg-violet-800 p-5 flex gap-10 items-center justify-between">
      <Link to={'/'}>
        <h1 className="text-xl text-white font-semibold">Checklists</h1>
      </Link>
      <ul className="text-white">
        <li>
          <Link to={'/perfil'}>
            <UserCircle />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
