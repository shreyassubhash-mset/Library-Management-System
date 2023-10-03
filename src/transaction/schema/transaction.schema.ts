import { Prop, Schema } from "@nestjs/mongoose";
import { Date } from "mongoose";


@Schema({
    timestamps: true
})

export class Transaction {
    @Prop({ required: true })
    bookid: string;

    @Prop({ required: true })
    userid: string;

    @Prop({ required: true })
    borrowedtime: Date;

    @Prop()
    returnedtime: Date;

}