import { useEffect, useState } from "react"
import { storage } from "../config/firebase"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

export default function BannerImage(){
    const [img,setImg] = useState('')
    const [imgURL,setImgURL] = useState('')

    const handleClick = () =>{
        if(img !==null){
      const imgRef =   ref(storage,`homePage/${v4()}`)
      uploadBytes(imgRef , img)
        }}
 
    useEffect (()=>{
        listAll(ref(storage,"homePage")).then(imgs=>{
            console.log(imgs)
            imgs.items.forEach(val=>{
                getDownloadURL(val).then(url=> {
                    setImgURL(data=> [...data,url])
                })
            })
        })
    },[])

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
