import { useEffect, useState } from "react";
import { database, storage } from "../config/firebase.jsx";
import { getDocs, collection,doc, deleteDoc,updateDoc } from 'firebase/firestore'
import { ref,uploadBytes } from "firebase/storage";

//only one data base, thats the blog, everything else is hardcoded
//includes rendering,editing and deleting
//writeImageFunction imported into blogposts so it gets rendered per post 


//TODO add functionality to create and delete posts from specific accounts

export default function BlogPosts(){
    //post image function
     const [fileUpload, setFileUpload] = useState(null)

     const uploadFile = () => {
        if (!fileUpload) return
        const filesFolderRef = ref(storage, `blogPhotos/${fileUpload.name}` )
        uploadBytes(filesFolderRef,fileUpload)
        //gives an error when try catched and set up as async, unsure whats up w/ that

    } 

    //delete function TODO make deletion button visibility Account specific
    const deletePost = async (id) =>{
        const postDoc = doc(database,"blogPosts",id)
        await deleteDoc(postDoc)
    }
    //edit function
    //editPostContent state
    const [updatedPostText, setUpdatedPostText] = useState("")

    const updatePostContent = async (id) =>{
        const postDoc = doc(database,"blogPosts",id)
        await updateDoc(postDoc, {postText: updatedPostText})
    }
    //editPostTitle
    const [updatedPostTitle, setUpdatedPostTitle] = useState("")

    const updatePostTitle = async (id) =>{
        const postDoc = doc(database,"blogPosts",id)
        await updateDoc(postDoc, {title: updatedPostTitle})
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
                     <div>
                     <button onClick={() => deletePost(post.id)}>Delete Post</button>
                     <input placeholder="Edit Post" onChange={(e) => setUpdatedPostText(e.target.value)}></input>
                     <button onClick={() => updatePostContent(post.id)}>Update Post</button>
                     <input placeholder="Edit Title" onChange={(e) => setUpdatedPostTitle(e.target.value)}></input>
                     <button onClick={() => updatePostTitle(post.id)}>Update Title</button>
                     <div>   
                         <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}/>
                         <button onClick={uploadFile}>Upload File</button>
                     </div>
                    </div>
                </ul>
            )))}
            
        </div>
        
    )
    //() => is needed because react doesn't like functions that call args otherwise it seems
    //empty dependency [] should prevent it from running all the time, only on load
    // onchange{(e)} grabs the event of adding/removing text 
    

}