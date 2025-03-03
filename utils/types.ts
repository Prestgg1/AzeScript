export interface responseCategoryType {
    data: {
        id: number;
        name: string;
        slug: string;
        description: string;
        image: string;
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