import { Schema, model, models, Document } from "mongoose";

export interface IPost extends Document {
    title: string;
    slug: string,
    excerpt: string,
    content: string,
    image: string,
    author: string,
    tags: string[],
    createdAt: string,
    updatedAt: string,
}

const PostSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        excerpt: {
            type: String,
            required: [true, 'Excerpt is required'],
            trim: true,
            maxlength: [1000, 'Excerpt cannot exceed 1000 characters'],
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            trim: true,
            maxlength: [100000, 'Content cannot exceed 100000 characters'],
        },
        image: {
            type: String,
            required: [true, 'Image URL is required'],
            trim: true,
        },
        author: {
            type: String,
            required: [true, 'Author is required'],
        },
        tags: {
            type: [String],
            required: [true, 'Tags are required'],
            validate: {
                validator: (v: string[]) => v.length > 0,
                message: 'At least one tag is required',
            },
        },
    },
    {
        timestamps: true,  // auto createdAt & updatedAt
    }
);

PostSchema.pre('save', function () {
    const post = this as IPost;

    if (post.isModified('title') || post.isNew) {
        post.slug = generateSlug(post.title);
    }
});

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .replace(/-+/g, '-')           // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens
}

PostSchema.index({slug: 1}, {unique:true});  // Create unique index on slug for better performance

const Post = models.Post || model<IPost>('Post', PostSchema);

export default Post;
