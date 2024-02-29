import { LOGO_IMG_URL } from "../utils/constants"
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link className="" to={"/"}>
        <img src={LOGO_IMG_URL} alt="motion_logo" className="bg-black"/>
    </Link>
  )
}

export default Logo