import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
     async registerUser(user: User) {
        const newUser =  await this.userModel.create(user);
        return newUser;
     }

     async loginUser(email: string, password: string) {
        const res = await this.userModel.find({ email, password }).exec();
        return res;
     }

     async getUserProfile(userId: string) {
        const res = await this.userModel.findById(userId).exec();
        return res;
     }

     async editUserProfile(userId: string, updatedUser: User) {
        const res = await this.userModel.findByIdAndUpdate(userId, updatedUser, { new: true }).exec();
        return  res ;
     }
     
}
