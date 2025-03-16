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
    averageRating: number;
    image: string;
    favorites: favoritesType[]
};
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
export type responseScriptDetailType = {
    data: ScriptType,
}
export interface categoryType {
    id: number;
    name: string;
    productCount: number;
    slug: string;
    description: string;
    image: string;
}