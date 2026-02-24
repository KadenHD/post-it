'use server';

import { Post } from "@/database";
import connectDB from "@/lib/mongodb";

export const getSimilarPostBySlug = async(slug:string) => {
    try {
        await connectDB()
        const post = await Post.findOne({slug});
        return await Post.find({_id: {$ne: post._id}, tags: {$in: post.tags}}).lean()
    } catch (error) {
        return [];
    }
}
