import { Auth } from "../components/auth.jsx";
import  BlogPosts  from '../components/blogPosts.jsx'
import  MakePost  from "../components/makeBlogPost.jsx";

export default function blog() {

    return (
      <div>
        <Auth />
        <BlogPosts />
        <MakePost />
      </div>

    )
    
}