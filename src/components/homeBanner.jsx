import { useEffect, useState } from "react"
import { storage } from "../config/firebase"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { useRef } from "react"

export default function BannerImage(){
    const [img,setImg] = useState('')
    const [imgURL,setImgURL] = useState('')

    const handleClick = () =>{
        if(img !==null){
      const imgRef =   ref(storage,`homePage/${v4()}`)
      uploadBytes(imgRef , img)
        }}
    const effectRan = useRef(false);
    //duplicate issue is a product of react strict mode to replicate with people switching back and forth between different tabs on a site, having useEffect check if it has ran once, is best practice
    useEffect (()=>{
        if (!effectRan.current) {
        listAll(ref(storage,"homePage")).then(imgs=>{
            imgs.items.forEach(val=>{
                getDownloadURL(val).then(url=> {
                    setImgURL(data=> [...data,url]), (err) => console.error("Failed to load image URL", err)
                })
            })
        })
        return () => effectRan.current = true;
        }},[])
    console.log(imgURL,"imgURL")
    const imgURLarray = Array.from(imgURL)
    //needs to be an array to map properly
    return( 
        <div>
            <div>
                <input type='file' onChange={(e)=> setImg(e.target.files[0])}/>
                <button onClick={handleClick}>Upload</button>
            </div>
            <div>
            <br/>
            {
                imgURLarray.map(dataVal=><div key={dataVal.id}>
                    <li >
                    <img src={dataVal} />
                    </li>
                    <br/>
                </div>)
            }   
            
            </div>
        </div>
    )
}
