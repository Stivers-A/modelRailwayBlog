import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { confirmUser } from "./namespace";
let user

console.log("Test confirmuser namespace" + confirmUser.auth );

import {  useState } from "react";
// got to make sure things get imported properly, this should have been auto imported, it was not
//signIn with popup enables googles signin popup
//signOut signs ya out
//TODO make auth a pop up page that auto closes one succesfull login/logout and have header display user name
//google has a photourl for signin that displays your account pfp
//TODO change the main sign in from createUser to something else, and add seperate create account button


const AuthUserCheck = () => {
  console.log("authCheck recieved " + user)
      if (user) {
        if (user =='"1721519413230"'){
          //somehow doesnt work despite being rhe 
          console.log("We are so in!")
          confirmUser.auth =  true
        }else{
          console.log("Nope.")
          confirmUser.auth =  false


        }
        // User is signed in.
      } else {
        // No user is signed in.
      }
      };


export const Auth = () => {
  const [email, setEmail] = useState(""); // holds value email and password inputs
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser?.email)
  // gets current user email
  // ? prevents it from breaking when no one is signed in

  const SignIn = async () => {
    //on button press
    //async function as firebase tends to use 'promises'
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    } // try&catch logs errors that may happen due to async&await

  };

  const SignInWithGoogle = async () => {
    //on button press
    //async function as firebase tends to use 'promises'
    try {
      await signInWithPopup(auth, googleProvider );
      // uses googleProvider instead of email and password for account access
      //account doesn't need to be made, because google TM
      console.log( auth )
      console.log(auth.currentUser.metadata.createdAt)
      // log(auth.currentUser.uid) works 
  
      user = JSON.stringify(auth.currentUser.metadata.createdAt)
          
     
      console.log("user" + user )
      
    } catch (err) {
      console.error(err);
    } // try&catch logs errors that may happen due to async&await
    //next up determining if user is an admin vvVvv
    AuthUserCheck()
  };

  const SignOutfunction = async () => {
    //on button press
    //async function as firebase tends to use 'promises'
    try {
      await signOut(auth);
      // uses googleProvider instead of email and password for account access
      //account doesn't need to be made, because google TM
    } catch (err) {
      console.error(err);
    } // try&catch logs errors that may happen due to async&await
  };


  
  
  
  return (
    <div class="text-end">
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        type="password" //blocks text from being visible
      />
      <button onClick={SignIn}> Sign In </button>
      <br></br>
      <button onClick={SignInWithGoogle}> Sign In With Google</button>
      
      <button onClick={SignOutfunction}>Sign Out</button>
    </div>
  );
  
};
