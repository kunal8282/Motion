import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import useAuthUser from "./hooks/useAuthUser";
import Loader from "./Components/Loader";

// Root File for our react application
const App = () => {

  const [isLoading] = useAuthUser()

   if(isLoading) return <div className="flex justify-center items-center h-screen"><Loader /></div>

    return (
      <div>
        <Header />
        <Outlet />
      </div>
    )
}

export default App;