import { Link } from 'react-router-dom';


export const LoggedOut = () => {

  return (

    <div className="navbar__logged-out">
      <Link
        to='/users'
        id='button'
        className="navbar__logged-out--button-login"
      >LOGIN</Link>
      <div>or</div>
      <Link
        to='/users/create'
        id='button'
        className="navbar__logged-out--button-create"
      >CREATE ACCOUNT</Link>
    </div>

  );

};
