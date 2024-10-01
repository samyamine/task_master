import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label";
import {useAxios} from "@/contexts/AxiosContext.tsx";

function Auth({ setCurrentUser }: { setCurrentUser:  React.Dispatch<any> }) {
    const client = useAxios();
    const [formIndex, setFormIndex] = useState(0);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    // const login = async () => {
    //     try {
    //         const res = await client.post("/auth/login/", { email: email, password: password1 });
    //
    //         if (res.status === 200) {
    //             console.log(res);
    //             console.log("LOGGED IN");
    //             setCurrentUser(true);
    //             localStorage.setItem('currentUser', 'true');
    //         } else {
    //             console.log(res);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    const login = async () => {
        try {
            const response = await client.post('/auth/login/', {
                email,
                password: password1,
            });
            console.log("LOGIN");
            console.log(response);
            setCurrentUser(response.data.user);  // Met à jour l'utilisateur dans l'état global
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    };

    const register = async () => {
        if (password1 !== password2) {
            console.log("Passwords do not match");
            return;
        }

        try {
            const res = await client.post("/auth/register/", { email, username, password: password1 });

            if (res.status === 200) {
                console.log("REGISTER");
                console.log(res);
                await login();
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const loadForm = () => {
        switch (formIndex) {
            // LOGIN
            case 1:
                return (
                    <div className={`flex flex-col gap-3`}>
                        <h2 className={`mb-5 font-bold text-xl`}>Login</h2>
                        <div>
                            <Label htmlFor={`email`}>Email</Label>
                            <Input id={`email`} type="email" placeholder="john_doe@mail.com"
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id={`password`} type="password" placeholder="my_strong_password"
                                   onChange={(e) => setPassword1(e.target.value)}/>
                        </div>
                        <Button onClick={() => login()} className={`w-full mt-5`}>Login</Button>

                        <div className={`text-sm flex items-center justify-center`}>
                            New to TaskMaster ?
                            <Button variant={`link`} className={`p-0 ml-2`}
                                    onClick={() => setFormIndex(2)}>Register</Button>
                        </div>
                    </div>
                );
            // REGISTER
            case 2:
                return (
                    <div className={`flex flex-col gap-3`}>
                        <h2 className={`mb-5 font-bold text-xl`}>Register</h2>
                        <div>
                        <Label htmlFor={`email`}>Email</Label>
                            <Input id={`email`} type="email" placeholder="john_doe@mail.com"
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <Label htmlFor={`username`}>Username</Label>
                            <Input id={`username`} type="text" placeholder="john.doe"
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div>
                            <Label htmlFor="password1">Password</Label>
                            <Input id={`password1`} type="password" placeholder="my_strong_password"
                                   onChange={(e) => setPassword1(e.target.value)}/>
                        </div>

                        <div>
                            <Label htmlFor="password2">Repeat password</Label>
                            <Input id={`password2`} type="password" placeholder="my_strong_password"
                                   onChange={(e) => setPassword2(e.target.value)}/>
                        </div>
                        <Button onClick={() => register()} className={`w-full mt-5`}>Register</Button>

                        <div className={`text-sm flex items-center justify-center`}>
                            Already have an account ?
                            <Button variant={`link`} className={`p-0 ml-2`} onClick={() => setFormIndex(1)}>Login</Button>
                        </div>
                    </div>
                );
            default:
                return (<></>);
        }
    };

    return (
        <div className={`w-full min-h-screen p-5 flex flex-col justify-center items-center`}>
            {formIndex === 0 ? (
                <>
                    <h1 className={`mb-10 text-xl text-center`}>
                        Welcome to the thrilling<br/><strong>TaskMaster</strong>
                    </h1>

                    <div className={`flex flex-col gap-3`}>
                        <Button
                            className={`bg-white border-2 border-blue-700 text-blue-700 hover:border-transparent hover:text-white`}
                            onClick={() => setFormIndex(1)}>Login</Button>
                        <Button className={`bg-blue-700`} onClick={() => setFormIndex(2)}>Register</Button>
                    </div>
                </>
            ) : (
                loadForm()
            )}
        </div>
    );
}

export default Auth;
