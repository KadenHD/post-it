import { Post } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import {v2 as cloudinary} from "cloudinary"

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const formData = await req.formData();
        let post;

        try {
            post = Object.fromEntries(formData.entries())
        } catch (error) {
            return NextResponse.json({message: 'Invalid JSON data format'}, {status: 400})
        }

        const file = formData.get('image') as File;

        if (!file) return NextResponse.json({message: 'Image file is required'}, {status: 400})

        let tags = JSON.parse(formData.get('tags') as string)

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'post-it'}, (error, results) => {
                if (error) return reject(error)
                resolve(results)
            }).end(buffer)
        })

        post.image = (uploadResult as {secure_url:string}).secure_url

        const createdPost = await Post.create({
            ...post,
            tags: tags,
        });

        return NextResponse.json({message: 'Post created successfully', post: createdPost}, {status: 201})

    } catch (error) {
        return NextResponse.json({message: 'Post Creation Failed', error: error instanceof Error ? error.message: 'Unknown'}, {status: 500})
    }
}

export async function GET() {
    try {
        await connectDB()
        const posts = await Post.find().sort({creadtedAt: -1})
        return NextResponse.json({message: 'Posts fetched successfully', posts}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Post fetching Failed', error: error }, {status: 500})
    }
}
