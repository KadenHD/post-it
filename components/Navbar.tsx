import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <header>
            <nav>
                <Link href="/#home" className="logo">
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
                    <p>Post'IT</p>
                </Link>

                <ul>
                    <Link href="/#home">Home</Link>
                    <Link href="/#posts">Posts</Link>
                    <Link href="/">Create Post</Link>
                </ul>
            </nav>
        </header>
    );
}
