import { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { confirmUser } from "./namespace";

export default function BannerImage() {
  const [img, setImg] = useState("");
  const [imgURL, setImgURL] = useState("");

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(storage, `homePage/${v4()}`);
      uploadBytes(imgRef, img);
    }
  };
  //duplicate issue is a product of react strict mode to replicate with people switching back and forth between different tabs on a site, having useEffect check if it has ran once, is best practice

  let ignore = false;

  useEffect(() => {
    if (!ignore) {
      listAll(ref(storage, "homePage")).then((imgs) => {
        imgs.items.forEach((val) => {
          getDownloadURL(val).then((url) => {
            setImgURL((data) => [...data, url]),
              (err) => console.error("Failed to load image URL", err);
          });
        });
      });
      console.log(ignore);

      return () => (ignore = true);
      // despite the warning that the change to ignore will be lost, it prevents re rendering
    }
  }, []);
  console.log(imgURL, "imgURL");
  const imgURLarray = Array.from(imgURL);
  //needs to be an array to map properly
  if (!confirmUser.auth) {
    return (<div>
      <br />
      {imgURLarray.map((dataVal) => (
        <div key={dataVal.id}>
          <li >
            <img src={dataVal} />
          </li>
          <br />
        </div>
      ))}
    </div>)}
  else
  return (
    <div>
      <div>
        <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        <button onClick={handleClick}>Upload</button>
      </div>
      <div>
        <br />
        {imgURLarray.map((dataVal) => (
          <div key={dataVal.id}>
            <li >
              <img src={dataVal} />
            </li>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
