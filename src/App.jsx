import NavBar from "./navbar";
import About from './pages/about.jsx'
import Blog from './pages/blog.jsx'
import Home from './pages/home.jsx'
import { Route,Routes } from "react-router-dom";

function App(){
  let PageComponent
  //Its time to make a website
  return (
    <>
    <NavBar />
    <div className="bodyContainer">
        <Routes>
          <Route path ="/" element={<Home />} />
          <Route path ="/blog" element={<Blog />} />
          <Route path ="/about" element={<About />} />
        </Routes>
    </div>

    </>
  )
  }
export default App;
//lets see can I save this to a branch or the main!