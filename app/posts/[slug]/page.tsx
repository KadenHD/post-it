import PostDetailItem from "@/components/PostDetailItem";
import PostSummaryContent from "@/components/PostSummaryContent";
import PostTags from "@/components/PostTags";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default async function PostDetailsPage({params}: {params: Promise<{slug: string}>}) {
    const { slug } = await params;
    const response = await fetch(`${BASE_URL}/api/posts/${slug}`);
    const {post} = await response.json()
    if(!post) return notFound()
    const { title, excerpt, image, content, author, tags, createdAt, updatedAt} = post

    return (
        <section id="post">
            <div className="header">
                <h1>{title}</h1>
                <PostDetailItem icon="/icons/mode.svg" alt="mode" label={excerpt} size={17}/>
            </div>

            <div className="details">
                {/* LEFT */}
                <div className="content">
                    <Image src={image} alt="Post Banner" width={800} height={800} className="banner" />

                    <section className="flex-col-gap-2">
                        <h2>Content</h2>
                        <p>{content}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Details</h2>
                        <PostDetailItem icon="/icons/audience.svg" alt="audience" label={author} size={17}/>
                        <PostDetailItem icon="/icons/clock.svg" alt="clock" label={`${createdAt} (last modification: ${updatedAt})`} size={17}/>
                    </section>

                    <PostTags tags={JSON.parse(tags[0])}/>
                </div>

                {/* RIGHT */}
                <aside className="summary">
                    <div className="summary-card">
                        <h2>Summary</h2>
                        <p className="text-sm">
                            Here is an interactive summary of each sections of this post.
                        </p>
                        
                        <PostSummaryContent />
                    </div>
                </aside>
            </div>
        </section>
    );
}
