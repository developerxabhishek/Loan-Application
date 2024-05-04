import { Link } from "react-router-dom";
const Navbar = () => {
  const toggleMenu = () => {
    const menuBox = document.querySelector(".menu-li");
    menuBox.classList.toggle("active");
  };
  return (
    <>
      <nav className="navbar">
        <div className="menu_left">
          <div className="logo">
            <h2>QuickCredit</h2>
          </div>
          <div className="menu-li">
            <ul className="menu">
              <li className="menu_list">
                <Link to="/home">Home</Link>
              </li>
              <li className="menu_list">
                <Link to="/login">Login</Link>
              </li>
              <li className="menu_list">
                <Link to="/register">Register</Link>
              </li>
              <li className="menu_list lg-hidden">
                <a
                  href="https://www.linkedin.com/in/abhishek-pandey-445a3128b/"
                  target="/blank"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="menu_right">
          <a
            href="https://www.linkedin.com/in/abhishek-pandey-445a3128b/"
            target="/blank"
            className="btn-contact sm-hidden"
          >
            Contact Us
          </a>
          <button onClick={toggleMenu} className="btn-menubar lg-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
