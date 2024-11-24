import { Auth } from "../components/auth.jsx";
import BlogPosts from "../components/blogPosts.jsx";
import MakePost from "../components/makeBlogPost.jsx";
import Popup from 'reactjs-popup';


export default function blog() {
  return (
    <div>
      <div class="position-absolute top-10 end-1">
        <Popup trigger=
                {<button> Login </button > }
                position="right center">
                <Auth />                
        </Popup>   
      </div>
      <MakePost />
      <BlogPosts />
    </div>
  );
}
