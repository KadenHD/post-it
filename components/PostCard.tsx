'use client';

import Link from "next/link";
import Image from "next/image";
import PostDetailItem from "./PostDetailItem";
import PostTags from "./PostTags";
import { dateFormat } from "@/lib/date";
import { useState } from "react";
import { useRouter } from 'next/navigation';

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
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deleted, setDeleted] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        const confirmed = confirm(`Are you sure you want to delete "${title}"?`);
        if (!confirmed) return;

        setDeleting(true);
        setError(null);

        try {
            const res = await fetch(`/api/posts/${slug}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Failed to delete post");
                setDeleting(false);
            } else {
                setDeleted(true);
                router.refresh();
            }
        } catch (err) {
            setError((err as Error).message);
            setDeleting(false);
        }
    };

    if (deleted) return null; // hide the card after deletion

    return (
        <div id="post-card" className="relative">
            <Link href={`/posts/${slug}`} className="block">
                <Image src={image} alt={title} width={410} height={300} className="poster" />

                <PostDetailItem icon="/icons/mode.svg" alt="mode" label={excerpt} size={14} />

                <p className="title">{title}</p>

                <div className="datetime">
                    <PostDetailItem icon="/icons/audience.svg" alt="audience" label={author} size={14} />
                    <PostDetailItem icon="/icons/clock.svg" alt="clock" label={dateFormat(createdAt, updatedAt)} size={14} />
                </div>
                <PostTags tags={tags}/>
            </Link>

            {/* Delete button */}
            <button
                onClick={handleDelete}
                disabled={deleting}
                className="absolute top-2 right-2 bg-destructive text-light-100 px-3 py-1 rounded hover:bg-destructive/90 z-10"
            >
                {deleting ? "Deleting..." : "Delete"}
            </button>

            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </div>
    );
}
