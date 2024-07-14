import { useEffect, useState } from "react";
import { database } from "../config/firebase.jsx";
import { getDocs, collection } from 'firebase/firestore'
//only one data base, thats the blog, everything else is hardcoded
export default function BlogPosts(){
    const[postList, setPostList] = useState([]);
    //create list

    const postCollectionRef = collection(database,"blogPosts")
    //collection Ref is used to to store blogposts that will be sent to data
    useEffect(() => {
        //use effect allows it to be async
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

        getPostList()
    }, [])

    return(
        <div>
            {postList.map((post =>(
                <ul key={post.id}>
                     <h1> {post.title} </h1> 
                     <p> {post.postText} </p>
                </ul>
            )))}
        </div>
    )
    //empty dependency [] should prevent it from running all the time, only on load

    

}