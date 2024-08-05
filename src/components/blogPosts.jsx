import { useEffect, useState } from "react";
import { database } from "../config/firebase.jsx";
import { getDocs, collection,doc, deleteDoc,updateDoc } from 'firebase/firestore'
//only one data base, thats the blog, everything else is hardcoded
//includes rendering,editing and deleting
//TODO add functionality to create and delete posts from specific accounts

export default function BlogPosts(){
    //delete function TODO make deletion button visibility Account specific
    const deletePost = async (id) =>{
        const postDoc = doc(database,"blogPosts",id)
        await deleteDoc(postDoc)
    }
    //edit function TODO make edit button account specific
    //editPostContent state
    const [updatedPost, setUpdatedPost] = useState("")

    const updatePostContent = async (id) =>{
        const postDoc = doc(database,"blogPosts",id)
        await updateDoc(postDoc, {postText: updatedPost})
    }
    const[postList, setPostList] = useState([]);
    //create list

    const postCollectionRef = collection(database,"blogPosts")
    //collection Ref is used to to store blogposts that will be sent to data
   
    const getPostList = async () => {
        //read data
        //set post list equal to data
        try{
        const data = await getDocs(postCollectionRef)
    
        //console.log(data)
        //unfiltered data looks messy
    
        const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        //maps through each document
        //gets data and ID
        console.log(filteredData)
        setPostList(filteredData)
        } catch (err) {
            console.error(err)
        }
    }
   
    useEffect(() => {
        //use effect allows it to be async
        

        getPostList()
    }, [])

    return(
        <div>
            {postList.map((post =>(
                <ul key={post.id}>
                     <h1> {post.title} </h1> 
                     <p> {post.postText} </p>
                     <button onClick={() => deletePost(post.id)}>Delete Post</button>
                     <input placeholder="Edit Post" onChange={(e) => setUpdatedPost(e.target.value)}></input>
                     <button onClick={() => updatePostContent(post.id)}>Update Post</button>
                </ul>
            )))}
        </div>
    )
    //() => is needed because react doesn't like functions that call args otherwise it seems
    //empty dependency [] should prevent it from running all the time, only on load
    // onchange{(e)} grabs the event of adding/removing text 
    

}