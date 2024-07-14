import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import { useState } from "react"; 
// got to make sure things get imported properly, this should have been auto imported, it was not
//signIn with popup enables googles signin popup
//signOut signs ya out
//TODO make auth a pop up page that auto closes one succesfull login/logout and have header display user name
        //google has a photourl for signin that displays your account pfp
//TODO change the main sign in from createUser to something else, and add seperate create account button
export const Auth = () => {
    const [email,setEmail] = useState("") // holds value email and password inputs
    const [password,setPassword] = useState("")

    // console.log(auth?.currentUser?.email) 
    // gets current user email
    // ? prevents it from breaking when no one is signed in
    const signIn = async () =>{
        //on button press
        //async function as firebase tends to use 'promises'
            try{
        await createUserWithEmailAndPassword(auth, email, password)
            } catch (err){
                console.error(err)
            }// try&catch logs errors that may happen due to async&await
    }

    const signInWithGoogle = async () =>{
        //on button press
        //async function as firebase tends to use 'promises'
            try{
        await signInWithPopup(auth, googleProvider)
        // uses googleProvider instead of email and password for account access
        //account doesn't need to be made, because google TM
            } catch (err){
                console.error(err)
            }// try&catch logs errors that may happen due to async&await
    }

    const signOutfunction = async () =>{
        //on button press
        //async function as firebase tends to use 'promises'
            try{
        await signOut(auth)
        // uses googleProvider instead of email and password for account access
        //account doesn't need to be made, because google TM
            } catch (err){
                console.error(err)
            }// try&catch logs errors that may happen due to async&await
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
         <button onClick={signInWithGoogle}> Sign In With Google</button>
        <button onClick={signOutfunction}>Sign Out</button> 
    </div>
    
}