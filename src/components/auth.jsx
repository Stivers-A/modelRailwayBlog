import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from "react"; // got to make sure things get imported properly, this should have been auto imported, it was not

export const Auth = () => {
    const [email,setEmail] = useState("") // holds value email and password inputs
    const [password,setPassword] = useState("")

    const signIn = async () =>{
        //on button press
        //async function as firebase tends to use 'promises'
        await createUserWithEmailAndPassword(auth, email, password)
    }
    return <div>
         <input 
            placeholder="Email" 
             onChange={(e) => setEmail(e.target.value)}
             /> 
         <input 
            placeholder="Password"
             onChange={(e) => setPassword(e.target.value)}
             type="password" //blocks text from being visible
             />  
         <button onClick={signIn}> Sign In </button>
    </div>
    
}