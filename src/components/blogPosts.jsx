import { useEffect, useMemo, useCallback, useState } from "react";
import { database, storage } from "../config/firebase.jsx";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//only one data base, thats the blog, everything else is hardcoded
//includes rendering,editing and deleting
//writeImageFunction imported into blogposts so it gets rendered per post
//v4 from uuid adds random strings to stuff to prevent repeat names

//TODO add functionality to create and delete posts from specific accounts
export default function BlogPosts() {
  const [postList, setPostList] = useState([]);
  //create list

  const postCollectionRef = useMemo(
    () => query(collection(database, "blogPosts"), orderBy("postDate",'desc')),
    []
  );
  //use memo prevents re rendering
  //collection Ref is used to to store blogposts that will be sent to data

  const getPostList = useCallback(async () => {
    //read data
    //set post list equal to data
    try {
      const data = await getDocs(postCollectionRef);

      //console.log(data)
      //unfiltered data looks messy

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //maps through each document
      //gets data and ID
      console.log(filteredData);
      setPostList(filteredData);
    } catch (err) {
      console.error(err);
    }
  }, [postCollectionRef]);
  useEffect(() => {
    //use effect allows it to be async
    //getpostlist is used to gather the posts
    getPostList();
  }, [getPostList]);

  return (
    <div>
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
  //() => is needed because react doesn't like functions that call args otherwise it seems
  //empty dependency [] should prevent it from running all the time, only on load
  // onchange{(e)} grabs the event of adding/removing text
}

const Post = ({ post: { id, title, postText, imageName } }) => {
  //delete function TODO make deletion button visibility Account specific
  const deletePost = useCallback(async () => {
    const postDoc = doc(database, "blogPosts", id);
    await deleteDoc(postDoc);
  }, [id]);
  //edit function
  //editPostContent state
  const [updatedPostText, setUpdatedPostText] = useState("");

  const updatePostContent = useCallback(async () => {
    const postDoc = doc(database, "blogPosts", id);
    await updateDoc(postDoc, { postText: updatedPostText });
  }, [id, updatedPostText]);
  //editPostTitle
  const [updatedPostTitle, setUpdatedPostTitle] = useState("");

  const updatePostTitle = useCallback(async () => {
    const postDoc = doc(database, "blogPosts", id);
    await updateDoc(postDoc, { title: updatedPostTitle });
  }, [id, updatedPostTitle]);

  const [fileUpload, setFileUpload] = useState([]);
  const uploadFile = useCallback(() => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `blogPhotos/${imageName}`);
    uploadBytes(filesFolderRef, fileUpload);
  }, [fileUpload, imageName]);
  //changes the image!

  const imageRef = useMemo(
    () => ref(storage, `blogPhotos/${imageName}`),
    [imageName]
  );
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!imageRef) {
      setUrl(null);
      return;
    }
    getDownloadURL(imageRef).then(
      (url) => setUrl(url),
      (err) => console.error("Failed to load image URL", err)
    );
  }, [imageRef, setUrl]);

  return (
    <div className=".container">
      <div className="container-md">
        <h1> {title} </h1>
        <p> {postText} </p>
      </div>
      <div className="container-md">
        <p>{url && <img src={url} alt="Post image" />}</p>
      </div>
      <div>
        <button onClick={() => deletePost()}>Delete Post</button>
        <textarea
          rows="4"
          cols="50"
          placeholder="Edit Post"
          value={updatedPostText}
          onChange={(e) => setUpdatedPostText(e.target.value)}
        />
        <button onClick={() => updatePostContent()}>Update Post</button>
        <input
          placeholder="Edit Title"
          value={updatedPostTitle}
          onChange={(e) => setUpdatedPostTitle(e.target.value)}
        ></input>
        <button onClick={() => updatePostTitle()}>Update Title</button>
        <div>
          <input
            type="file"
            onChange={(e) => setFileUpload(e.target.files[0])}
          />
          <button onClick={() => uploadFile()}>Upload File</button>
        </div>
      </div>
    </div>
  );
};
