import React, {useState} from "react";

const Register =() =>
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] =useState("");
    const [email, setEmail] =useState("");
    const isAdministrator =false;

    const register = async(ev) =>
    {
        ev.preventDefault();
        const result = await register();
    }

    return <div>
        <form onSubmit={register}>
            <label>Name</label>
            <input placeholder="Name..." value={name} onChange={ev => setUsername(ev.target.value)}></input>
            <label>Email</label>
            <input placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)}></input>
            <label>Username</label>
            <input placeholder="Username" value={username} onChange={ev => setUsername(ev.target.value)}></input>
            <label>Password</label>
            <input placeholder="Password" value={password} type={password} onChange={ev => setPassword(ev.target.value)}></input>
            <button>Submit</button>
        </form>
    </div>
}

export default Register;