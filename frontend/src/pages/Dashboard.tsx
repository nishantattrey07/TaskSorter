import { useNavigate } from "react-router-dom";
import AppBar from "../components/Appbar"
import { useSetRecoilState } from "recoil";
import { userToken } from "../store/atoms/Auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(userToken);

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate('/login');
    } else {
      setToken(authToken);
    }





    return (
        <div className="">
            <AppBar name={"TaskSorter"} nameFirstLetter="N" />
            
            
           
        </div>
    )

}