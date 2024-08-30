import { addDoc,collection,deleteDoc,doc } from "firebase/firestore"
import { useState } from "react"
import { database,storage, auth } from "../config/firebase.jsx";
import { v4 } from "uuid" 
import { ref,uploadBytes } from "firebase/storage";




// currently exports to blog
console.log("Does this actually show up?")
// New Post States

const postCollectionRef = collection(database,"blogPosts")


export default function MakePost(){
    const [newPostTitle, setNewPostTitle] = useState("")
    const [newPostContent, setNewPostContent] = useState("")
    const [fileUpload, setFileUpload] = useState(null)

    const onSubmitPost = async () =>{
        if (!fileUpload) return
        const imgName = newPostTitle + v4()
        const filesFolderRef = ref(storage, `blogPhotos/${  (imgName)}` )
            uploadBytes(filesFolderRef,fileUpload).then(() => {
                console.log("Image Uploaded")
            })
        try{
        await addDoc(postCollectionRef,{
            title: newPostTitle,
            postText: newPostContent,
            userId: auth?.currentUser?.uid,
            imageName: imgName
            
            })
        }catch(err){
            console.error(err)
        }
       
    }



    return(
    <div>   
        Title:  <input placeholder="Post Title" onChange={(e) => setNewPostTitle(e.target.value)}/>
        Content:  <input placeholder="Post Content" onChange={(e) => setNewPostContent(e.target.value)}/>
        <div>   
            <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}/>
        </div>
        <button onClick={onSubmitPost}>Submit Post</button>
    </div>
    )

}