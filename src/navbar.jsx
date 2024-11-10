import { useImperativeHandle } from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
export default function NavBar(){
    return (
    <nav className="nav">
        <CustomLink to="/" className="siteTitle">
            Alex's Model Trains
        </CustomLink>
        <ul>    
            <CustomLink to="/blog" className="siteTitle">Blog</CustomLink>
            <CustomLink to="/about" className="siteTitle">About</CustomLink>
        </ul>

    </nav>
    )

}
//to is href with react router Link replaces a so that pages only refresh in areas affected by press
function CustomLink({ to,children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true}) 
    //end true ensures you dont  say enter /books/Lovecraft and have /books show up as active instead, makes sure link cant be partial match
    return(
        <li className={isActive ? "link-active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    ) 
}