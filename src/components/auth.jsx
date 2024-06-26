import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const Auth = () => {
    const [email,setEmail] = useState("") // blocks email and password inputs
    const [password,setPassword] = useState("")

    const signIn = async () =>{
        //on button press
        //async function as firebase tends to use 'promises'
        await createUserWithEmailAndPassword(auth, email, password)
    }
    return <div>
         <input placeholder="Email" 
             onChange={(e) => setEmail(e.target.value)}/> 
         <input placeholder="Password"
             onChange={(e) => setPassword(e.target.value)}/>  
         <button onClick={signIn}> Sign In </button>
    </div>
    
}