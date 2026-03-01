import { IPost, Post } from "@/database"
import { isoToLocal } from "@/lib/date";
import connectDB from "@/lib/mongodb"
import {v2 as cloudinary} from "cloudinary"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:  NextRequest, {params}: {params: Promise<{slug:string}>}): Promise<NextResponse> {
    try {
        await connectDB()
        const {slug} = await params;
        if (!slug || typeof slug !=='string' || slug.trim() === '') return NextResponse.json({message: 'Invalid or missing slug parameter'}, {status: 400})
        const sanitizedSlug = slug.trim().toLowerCase()
        const post: IPost | null = await Post.findOne({slug: sanitizedSlug}).lean()
        if (!post) return NextResponse.json({message: `Post with slug '${sanitizedSlug}' not found`}, {status: 404})

        const formattedPost = {...post, createdAt: isoToLocal(post.createdAt), updatedAt: isoToLocal(post.updatedAt) }
        return NextResponse.json({message: 'Post fetched successfully', post: formattedPost}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Failed to fetch post'}, {status: 500})
    }
}

export async function DELETE(req:  NextRequest, {params}: {params: Promise<{slug:string}>}): Promise<NextResponse> {
  try {
    await connectDB()
    const {slug} = await params;
    if (!slug || typeof slug !=='string' || slug.trim() === '') return NextResponse.json({message: 'Invalid or missing slug parameter'}, {status: 400})
    const sanitizedSlug = slug.trim().toLowerCase()
    const post: IPost | null = await Post.findOne({slug: sanitizedSlug}).lean()
    if (!post) return NextResponse.json({message: `Post with slug '${sanitizedSlug}' not found`}, {status: 404})

    const deletedPost = await Post.findOneAndDelete({slug: sanitizedSlug});
    if (deletedPost?.imagePublicId) await cloudinary.uploader.destroy(deletedPost.imagePublicId);
    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({message: "Delete failed", error: error instanceof Error ? error.message : "Unknown"}, { status: 500 });
  }
}
