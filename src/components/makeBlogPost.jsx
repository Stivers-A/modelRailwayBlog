import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { database, storage, auth } from "../config/firebase.jsx";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { confirmUser } from "./namespace";

// currently exports to blog
console.log("Does this actually show up?" + confirmUser.auth );
// New Post States

const postCollectionRef = collection(database, "blogPosts");

export default function MakePost() {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const onSubmitPost = async () => {
    console.log("onSubmitPost called");

    //NEW PROBLEM, ONLY UPLOADS IF THERE IS AN IMAGE
    if (!fileUpload) {
      const time = Date.now()
      //const d = new Date();
      //const time = d.toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',second: '2-digit'});
      console.log(time) 
      console.log(auth.currentUser)
      try {
        console.log("Post Uploaded no image");
        await addDoc(postCollectionRef, {
          title: newPostTitle,
          postText: newPostContent,
          userId: auth?.currentUser?.metadata.createdAt,
          postDate: time,
        });
      } catch (err) {
        console.error(err);
      }
      return
    }
    {
      const imgName = newPostTitle + v4();
      const time = Date.now()

            //const d = new Date();
      //const time = d.toLocaleDateString([], {});
//{year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',second: '2-digit'
//apparently that style of dating breaks chronological sort on posts a month apart, checking default and switching to it if it works better.  
//commenented out in both imageless, and with image 
//gives imagefile a random unique name
      const filesFolderRef = ref(storage, `blogPhotos/${imgName}`);
      await uploadBytes(filesFolderRef, fileUpload);
      console.log("Image Uploaded");
        

      try {
        console.log("Post Uploaded");
        await addDoc(postCollectionRef, {
          title: newPostTitle,
          postText: newPostContent,
          userId: auth?.currentUser?.metadata.createdAt,
          imageName: imgName,
          postDate: time,

        });
      } catch (err) {
        console.error(err);
      }
      return
    }

  };
if (!confirmUser.auth){
  return (
    null
  )
}
else
  return (
    <div>
      Title:{" "}
      <input
        placeholder="Post Title"
        onChange={(e) => setNewPostTitle(e.target.value)}
      />
      Content:{" "}
      <textarea rows="4" cols="50"
        placeholder="Post Content"
        onChange={(e) => setNewPostContent(e.target.value)}
      />
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
      </div>
      <button onClick={onSubmitPost}>Submit Post</button>
    </div>
  );
}
