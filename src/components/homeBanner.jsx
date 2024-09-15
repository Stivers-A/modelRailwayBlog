import { useState } from "react"
import { storage } from "../config/firebase"
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

function BannerImage(){
    const [img,setImg] = useState('')
    const handleClick = () =>{
      const imgRef =   ref(storage,`homePage/${v4()}`)
      uploadBytes(imgRef)
    }
    return( 
        <div>
            <input type='file' onChange={(e)=> setImg(e.target.files[0])}/>
            <button onClick={handleClick}>Upload</button>
        </div>
    )
}
export default BannerImage