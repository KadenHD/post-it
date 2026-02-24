import Link from "next/link";
import Image from "next/image";
import PostDetailItem from "./PostDetailItem";
import PostTags from "./PostTags";

export default function PostCard({slug, title, excerpt, image, tags, author, createdAt, updatedAt}: {
    slug:string;
    title: string;
    excerpt: string;
    image: string;
    tags: string[];
    author: string;
    createdAt: string;
    updatedAt: string;
}) {
    return (
        <Link href={`/posts/${slug}`} id="post-card">
            <Image src={image} alt={title} width={410} height={300} className="poster" />

            <PostDetailItem icon="/icons/mode.svg" alt="mode" label={excerpt} size={14} />

            <p className="title">{title}</p>

            <div className="datetime">
                <PostDetailItem icon="/icons/audience.svg" alt="audience" label={author} size={14} />
                <PostDetailItem icon="/icons/clock.svg" alt="clock" label={`${createdAt} (last modification: ${updatedAt})`} size={14} />
            </div>
            <PostTags tags={JSON.parse(tags[0])}/>
        </Link>
    );
}
