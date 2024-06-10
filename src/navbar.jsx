export default function NavBar(){
    return (
    <nav className="nav">
        <a href="/" className="siteTitle">
            Site Name
        </a>
        <ul>    
            <CustomLink href="/blog">Blog</CustomLink>
            <CustomLink href="/about">About</CustomLink>
        </ul>

    </nav>
    )

}

function CustomLink({ href,children, ...props}){
    const path = window.location.pathname
    return(
        <li className={path === href ? 'active' : ""}>
            <a href={href}>{children}</a>
        </li>
    ) 
}