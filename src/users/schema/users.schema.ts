import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({
    timestamps: true
})

export class User extends Document{
    @Prop({unique: true, required: true})
    username: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

}

export const UsersSchema = SchemaFactory.createForClass(User);