import { useCallback, useState, ChangeEvent } from "react";
import InputBox from "../components/Inputbox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const { VITE_USER_PATH } = import.meta.env;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleFirstNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setFirstName(e.target.value)
        }, [setFirstName]
    );

    const handleLastNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setLastName(e.target.value)
        }, [setLastName]
    );

    const handleUsernameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
        }, [setUsername]
    );

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
        const response = await axios.post(`${VITE_USER_PATH}/user/signup`, {
            username, firstName, lastName, email, password
        });
        console.log(response.data.token);
        
        navigate('/dashboard');
    }

    return (
        <div className="flex items-center justify-center">
            <div className="shadow-md min-w-[250px] sm:min-w-[350px] max-w-[450px]">
                <div className="text-2xl mb-7 mt-2 font-bold">
                    Sign Up
                </div>

                <div className="text-left mx-4 text-sm font-medium py-1 flex flex-col justify-between">
                    <InputBox placeholder="Nishant" type="text" className="px-2 py-2 mb-3 outline-none border-charcol border" label="FirstName" onchange={handleFirstNameChange} value={firstName} />
                    <InputBox placeholder="Attrey" type="text" className="px-2 py-2 mb-3 outline-none border-charcol border" label="LastName" onchange={handleLastNameChange} value={lastName} />
                    <InputBox placeholder="nishantattrey" type="text" className="px-2 py-2 mb-3 outline-none border-charcol border" label="Username" onchange={handleUsernameChange} value={username} />
                    <InputBox placeholder="email@example.com" type="text" className="px-2 py-2 mb-3 outline-none border-charcol border" label="Email" onchange={handleEmailChange} value={email} />
                    <InputBox placeholder="password" type="password" className="px-2 py-2 mb-3 outline-none border-charcol border" label="Password" onchange={handlePasswordChange} value={password} />
                </div>

                <div className="flex flex-col gap-3 items-center">
                    <div>
                        <Button classname="rounded p-2 sm:min-w-[150px] min-w-[100px] " label={"Sign Up"} onClick={handleButtonClick} />
                    </div>


                    <div className="flex text-sm">
                        <p>Already have an Account? </p>
                        <a className="pointer underline pl-1 cursor-pointer mb-3" onClick={() => {
                            console.log(VITE_USER_PATH);
                        }}>Sign In</a>

                    </div>
                </div>
            </div>
        </div>
    )
}