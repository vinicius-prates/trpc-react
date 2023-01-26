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

        <div>
            <h1 className="text-2xl font-bold"> New User </h1>

            <form className="flex- flex-col" onSubmit={(e) => {
                e.preventDefault();
                mutate({
                    username: username,
                    email: email,
                    age: age,
                    password: password,
                })
                
            }}>
                <input type="string" placeholder="User Name" onChange={(e) => setUserName(e.target.value)}/>
                <input type="string" placeholder="example@gmail.com" onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
                <input type="number" placeholder="your age" onChange={(e) => setAge(e.target.valueAsNumber)}/>
                <button className="">Register</button>


            </form>
        </div>
    )
}