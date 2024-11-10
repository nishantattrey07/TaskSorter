import { useCallback, useState, ChangeEvent } from "react";
import InputBox from "../components/Inputbox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userToken } from "../store/atoms/Auth";

export default function Signin() {
    const { VITE_USER_PATH } = import.meta.env;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUserToken = useSetRecoilState(userToken);
    const navigate = useNavigate();
    const handleEmailChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value)
        }, [setEmail]
    );

    const handlePasswordChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        }, [setPassword]
    );

    const handleButtonClick = async () => {
        const response = await axios.post(`${VITE_USER_PATH}/user/signin`, {
        email, password
        });
        
        const token = response.data.token;
        setUserToken(token);
        localStorage.setItem("authToken", token);
        navigate('/dashboard');
    }

    return (
        <div className="flex items-center justify-center">
            <div className="shadow-md rounded min-w-[250px] sm:min-w-[350px] max-w-[450px] bg-lavender mt-11">
                <div className="text-2xl mb-7 mt-2 font-bold text-center text-charcol">
                    Sign In
                </div>

                <div className="text-left mx-4 text-sm font-medium py-1 flex flex-col justify-between">
                    <InputBox placeholder="email@example.com" type="text" className="px-2 py-2 mb-3 outline-none border-charcol border" label="Email" onchange={handleEmailChange} value={email} />
                    <InputBox placeholder="password" type="password" className="px-2 py-2 mb-3 outline-none border-charcol border" label="Password" onchange={handlePasswordChange} value={password} />
                </div>

                <div className="flex flex-col gap-3 items-center">
                    <div>
                        <Button classname="rounded p-2 sm:min-w-[150px] min-w-[100px] " label={"Sign In"} onClick={handleButtonClick} />
                    </div>


                    <div className="flex text-sm">
                        <p>Don't have an Account? </p>
                        <a className="pointer underline pl-1 cursor-pointer mb-3" onClick={() => {
                           navigate('/signUp')
                        }}>Sign Up</a>

                    </div>
                </div>
            </div>
        </div>
    )
}