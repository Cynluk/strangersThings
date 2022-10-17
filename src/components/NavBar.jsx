import { Link } from "react-router-dom";

function NavBar(){
    return (
        <nav>
           <h3>Stranger's Things</h3>
            <Link to = "/posts">Home</Link>
            <Link to = "/user/me">Profile </Link>
            <Link to = "/users/login"> Login</Link>
            <Link to = "/users/login">Logout</Link>
            <Link to = "/users/register">Register</Link>
        </nav>
    )
}
export default NavBar;