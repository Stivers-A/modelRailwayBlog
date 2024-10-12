import { app } from "../config/firebase";
import { user } from "./auth";
export const AuthUserCheck = () => {
    
    app.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user)
        if (user.uid=="W9RAq6HDQ1RWJZM9njZQ3VYRbNS2"){
          console.log("We are so in!")
        }else{
          console.log("Nope.")

        }
        // User is signed in.
      } else {
        // No user is signed in.
      }
      });
  //TODO make this useEffect work
  };
  export let loggedIn