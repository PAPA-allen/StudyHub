import {Schema, model, Document} from "mongoose";


interface FaqItem extends Document{
    question:string;
    answer:string;
}

interface Category extends Document{
    title:string;
}

interface BannerImage extends Document{
    public_id:string;
    url:string;
}

interface Layout extends Document{
    type:string;
    faq:FaqItem[];
    categories:Category[];
    banner:{
        image:BannerImage;
        title:string;
        subTitile:string;
    }

}

const faqSchema = new Schema<FaqItem>({
    question:{type:String},
    answer:{type:String}
});

const categorySchema = new Schema<Category> ({
title:{type:String}
})

const bannerImageSchema = new Schema <BannerImage>({
    public_id:String,
    url:{type:String}
})

const layoutSChema = new Schema <Layout>({
    type:{type:String},
    faq:[faqSchema],
    categories:[categorySchema],
    banner:{
        image:bannerImageSchema,
        title:{type:String},
        subTitle:{type:String},
    },
})

const LayoutModel=model<Layout>('Layout', layoutSChema);

export default LayoutModel;