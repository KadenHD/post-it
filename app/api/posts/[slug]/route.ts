import { IPost, Post } from "@/database"
import connectDB from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:  NextRequest, {params}: {params: Promise<{slug:string}>}): Promise<NextResponse> {
    try {
        await connectDB()
        const {slug} = await params;
        if (!slug || typeof slug !=='string' || slug.trim() === '') {
            return NextResponse.json({message: 'Invalid or missing slug parameter'}, {status: 400})
        }
        const sanitizedSlug = slug.trim().toLowerCase()
        const post: IPost | null = await Post.findOne({slug: sanitizedSlug}).lean()
        if (!post) {
            return NextResponse.json({message: `Post with slug '${sanitizedSlug}' not found`}, {status: 404})
        }
        return NextResponse.json({message: 'Post fetched successfully', post}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Failed to fetch post'}, {status: 500})
    }
}
