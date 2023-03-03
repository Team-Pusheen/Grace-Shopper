import React, {useState} from "react";
import { register } from "../fetchFunctions";

const Register =() =>
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] =useState("");
    const [email, setEmail] =useState("");
    
    const goRegister = async(ev) =>
    {
        ev.preventDefault();
        const result = await register(username, password, name, email);
        setUsername("");
        setEmail("");
        setPassword("");
        setName("");
        setEmail("");
    }

    return <div>
        <form onSubmit={goRegister}>
            <label>Name</label>
            <input placeholder="Name..." onChange={ev => setName(ev.target.value)} value={name}></input>
            <label>Email</label>
            <input placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)}></input>
            <label>Username</label>
            <input placeholder="Username" value={username} onChange={ev => setUsername(ev.target.value)}></input>
            <label>Password</label>
            <input placeholder="Password" value={password} type="password" onChange={ev => setPassword(ev.target.value)}></input>
            <button>Submit</button>
        </form>
    </div>
}

export default Register;