import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { signOut } from '../store/slices/authSlice';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { RootState } from '../store';

interface JwtPayload {
  username?: string;
}

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (auth.token) {
      const decodedToken: JwtPayload = jwtDecode(auth.token);
      setUsername(decodedToken.username || '');
    }
  }, [auth.token]);

  const logout = () => {
    dispatch(signOut());
    navigate('/login')
  };

  return (
    <>
      <header>
        <nav className="border-gray-200 px-4 py-2.5 border-b-2">
          <div className="flex justify-between items-center mx-auto max-w-screen-xl">
            <Link to={`/products`}>Products</Link>
            <div className='flex items-center gap-6'>
              Hello {username}
              <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                onClick={logout}>Log out</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
