import type { User } from 'better-auth';
import { Comment } from './../.nuxt/components.d';
import { comments } from './../db/schema';
export interface responseCategoryType {
    data: {
        id: number;
        name: string;
        slug: string;
        description: string;
        image: string;
    }
}
export interface ScriptType {
    id: number;
    title: string;
    slug: string;
    category: categoryType;
    features: string;
    price: string;
    keywords: string;
    requirements: string;
    content: string;
    description: string;
    comments:Comment[],
    averageRating: number;
    image: string;
    demoLink:string,
    has_favorited: boolean
};
export type Comment = {
    id:number,
    user: User,
    date:  string,
    comment:string,
    rate:number
}
export interface favoritesType {
    id: number;
}
export type responseScriptType = {
    data: ScriptType[],
    pagination: {
        currentPage: number,
        totalPages: number,
    }
}

export interface categoryType {
    id: number;
    name: string;
    productCount: number;
    slug: string;
    description: string;
    image: string;
}