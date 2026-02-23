import Link from "next/link";
import Image from "next/image";

interface Props {
    slug:string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    publishedAt: string;
}

export default function PostCard({slug, title, excerpt, image, author, publishedAt}: Props) {
    return (
        <Link href={`/posts/${slug}`} id="post-card">
            <Image src={image} alt={title} width={410} height={300} className="poster" />

            <div className="flex flex-row gap-2">
                <Image src="/icons/mode.svg" alt="excerpt" width={14} height={14} />
                <p>{excerpt}</p>
            </div>

            <p className="title">{title}</p>

            <div className="datetime">
                <div>
                    <Image src="/icons/audience.svg" alt="author" width={14} height={14} />
                    <p>{author}</p>
                </div>
                <div>
                    <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
                    <p>{publishedAt}</p>
                </div>
            </div>
        </Link>
    );
}
