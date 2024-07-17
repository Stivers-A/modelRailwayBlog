import { Auth } from "../components/auth.jsx";
import  BlogPosts  from '../components/blogPosts.jsx'
import  MakePost  from "../components/makeBlogPosts.jsx";

export default function blog() {

    return (
        <div>
        <Auth />
        <MakePost />
        <BlogPosts />
      </div>

    )
    
}