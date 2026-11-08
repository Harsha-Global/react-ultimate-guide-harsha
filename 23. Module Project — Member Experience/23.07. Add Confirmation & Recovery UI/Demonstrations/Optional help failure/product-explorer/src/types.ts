export type Product = {
    readonly id: string;
    readonly name: string;
    readonly category: "Home" | "Travel" | "Audio";
    readonly price: number;
    readonly inStock: boolean;
    readonly maxQuantity: number;
    readonly image: string;
    readonly description: string;
    readonly features: {
        text: string;
    }[];
};
