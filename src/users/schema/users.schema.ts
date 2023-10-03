import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class User {
    @Prop({unique: true, required: true})
    username: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

}

export const UsersSchema = SchemaFactory.createForClass(User);