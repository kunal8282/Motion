import { Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import { FaArrowRightLong, FaCartShopping } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import ProfileDropBox from "./ProfileDropBox";
import {useSelector} from "react-redux";

const Header = () => {

  const user = useSelector((store) => store.auth?.user)

  return (
    <Container>
      <nav className="flex justify-between items-center py-5">
        <div>
          <Logo />
        </div>

        <div>
          <ul className="flex gap-7 text-lg tracking-wide">
            <li>Mens</li>
            <li>Women</li>
            <li>Kids</li>
            <li>About Us</li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <Link>
            <Button background="bg-none">
              <div className="text-2xl text-black">
                <IoSearchOutline />
              </div>
            </Button>
          </Link>

          {user ? (
            <ProfileDropBox name={user.name} />
          ) : (
            <Link to={"/auth"}>
              <Button>
                <div>
                  <FaArrowRightLong />
                </div>
                <div>Login</div>
              </Button>
            </Link>
          )}

          <Link>
            <Button background="bg-none">
              <div className="text-2xl text-black">
                <FaCartShopping />
              </div>
            </Button>
          </Link>
        </div>
      </nav>
    </Container>
  );
};

export default Header;
