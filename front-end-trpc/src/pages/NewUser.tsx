import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { api } from "../util/trpc";
export const NewUser = () => {

    const [ username, setUserName] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ age, setAge] = useState(15);
    const { mutate }  = useMutation(["createUser"], api.createUser.mutate, {
        onError: (err) => {
            console.log(err);
            alert("Couldn't register your user.")
        },
        onSuccess: () => {
            alert(`${username}, você foi registrado!`)
        }
        
    })
    return(

        <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold "> New User </h1>

            <form className="flex flex-col gap-4 " onSubmit={(e) => {
                e.preventDefault();
                mutate({
                    username: username,
                    email: email,
                    age: age,
                    password: password,
                })
                
            }}>
                <input type="string" className="text-md bg-gray-100 text-gray-700 p-2 focus:outline-none rounded-lg" placeholder="User Name" onChange={(e) => setUserName(e.target.value)}/>
                <input type="string"  className="text-md bg-gray-100 text-gray-700 p-2 focus:outline-none rounded-lg" placeholder="example@gmail.com" onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password"  className="text-md bg-gray-100 text-gray-700 p-2 focus:outline-none rounded-lg" placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
                <input type="number"  className="text-md bg-gray-100 text-gray-700 p-2 focus:outline-none rounded-lg" placeholder="your age" onChange={(e) => setAge(e.target.valueAsNumber)}/>
                <button className="bg-blue-500 py-3 rounded-xl text-white font-bold  lg:self-center  hover:bg-[#323232] duration-300 w-40">Register</button>


            </form>
        </div>
    )
}