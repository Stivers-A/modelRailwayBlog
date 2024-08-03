import { useEffect, useState } from "react";
import { database } from "../config/firebase.jsx";
import { getDocs, collection,doc, deleteDoc } from 'firebase/firestore'
//only one data base, thats the blog, everything else is hardcoded

//TODO add functionality to create and delete posts from specific accounts

export default function BlogPosts(){
    //delete function TODO make deletion button visibility Account specific
    const deletePost = async (id) =>{
        const postDoc = doc(database,"blogPosts",id)
        await deleteDoc(postDoc)
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
                </ul>
            )))}
        </div>
    )
    //() => is needed because react doesn't like functions that call args otherwise it seems
    //empty dependency [] should prevent it from running all the time, only on load

    

}