export default function NavBar(){
    return (
    <nav className="nav">
        <a href="/" className="siteTitle">
            Site Name
        </a>
        <ul>
            <li>
                <a href="/blogPosts">Blog Posts</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
        </ul>

    </nav>
    )

}
