import NavBar from "./navbar";
import about from './pages/about.jsx'
import blog from './pages/blog.jsx'
import home from './pages/home.jsx'

function App(){
  let PageComponent
  //Its time to make a website
  switch(window.location.pathname){
    case"/":
      PageComponent = home
      break
    
    case"/blog": 
      PageComponent = blog 
      break
    
    case"/about":
      PageComponent = about 
      break 
  }
  return (
    <>
    <NavBar />
    <div className="bodyContainer">
    <PageComponent />
    </div>
    </>
  )
  }
export default App;