import PostCard from "@/components/PostCard";
import PostDetailItem from "@/components/PostDetailItem";
import PostSummaryContent from "@/components/PostSummaryContent";
import PostTags from "@/components/PostTags";
import { IPost } from "@/database";
import { getSimilarPostBySlug } from "@/lib/actions/post.actions";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default async function PostDetailsPage({params}: {params: Promise<{slug: string}>}) {
    const { slug } = await params;
    const response = await fetch(`${BASE_URL}/api/posts/${slug}`);
    const {post} = await response.json()
    if(!post) return notFound()
    const { title, excerpt, image, content, author, tags, createdAt, updatedAt} = post

    const similarPosts: IPost[] = await getSimilarPostBySlug(slug)

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

                    <PostTags tags={tags}/>
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

            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Posts</h2>
                <div className="posts">
                    {similarPosts.length > 0 && similarPosts.map((similarPost: IPost) => (
                        <PostCard key={similarPost.slug} {...similarPost} />
                    ))}
                </div>
            </div>
        </section>
    );
}
