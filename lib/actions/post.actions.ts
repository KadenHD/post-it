'use server';

import { Post } from "@/database";
import connectDB from "@/lib/mongodb";
import { isoToLocal } from "@/lib/date";

export const getSimilarPostBySlug = async(slug:string) => {
    try {
        await connectDB()
        const post = await Post.findOne({slug});
        const posts = await Post.find({_id: {$ne: post._id}, tags: {$in: post.tags}}).lean()
        const formattedPosts = posts.map(post => ({...post, createdAt: isoToLocal(post.createdAt), updatedAt: isoToLocal(post.updatedAt) }))
        return formattedPosts
    } catch (error) {
        return [];
    }
}
