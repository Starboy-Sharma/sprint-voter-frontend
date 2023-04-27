import { AiOutlineHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom'

export function NavBar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/teams" className='btn'>
            {' '}
            <AiOutlineHome />{' '} Home
          </Link>
        </li>
        <li>
          {' '}
          Logout <FiLogOut />{' '}
        </li>
      </ul>
    </div>
  );
}
