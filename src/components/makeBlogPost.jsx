import { addDoc,collection } from "firebase/firestore"
import { useState } from "react"
import { database } from "../config/firebase.jsx";



// currently exports to blog
console.log("Does this actually show up?")
// New Post States

const postCollectionRef = collection(database,"blogPosts")


export default function MakePost(){
    const [newPostTitle, setNewPostTitle] = useState("")
    const [newPostContent, setNewPostContent] = useState("")
    const onSubmitPost = async () =>{
        try{
        await addDoc(postCollectionRef,{
            title: newPostTitle,
             postText: newPostContent
            })
        }catch(err){
            console.error(err)
        }
    }
    return(
    <div>   
        Title:  <input placeholder="Post Title" onChange={(e) => setNewPostTitle(e.target.value)}/>
        Content:  <input placeholder="Post Content" onChange={(e) => setNewPostContent(e.target.value)}/>
        <button onClick={onSubmitPost}>Submit Post</button>
    </div>
    )

}