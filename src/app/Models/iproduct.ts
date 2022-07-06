export interface IProduct {

    id:number;
    name:string;
    description:string;
    quantity:number;
    price:number;
    image:string;
    categoryId:number;
    hasDiscount:boolean;
    priceAfterDiscount:number;
    colors:[];
    sizes:[];
}
