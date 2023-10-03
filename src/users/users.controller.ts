import { Controller, Get, Post, Put, Body, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from '@nestjs/passport';
import { User } from './users.model';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async registerUser(@Body() user:User) {
        try {
            await this.usersService.registerUser(user);
            return 'User registered successfully'
        } catch (error) {
            throw new Error('Failed to register user')
        }
    }

    @Post('login')
    async loginUser(@Body('email') email: string, @Body('password') password: string) {
        const user = await this.usersService.loginUser(email, password);
        if (user) {
            const authToken = generateAuthToken(user);
            return authToken;
        } else {
            throw new Error('Invalid email or password');
        }
    }


    @Get('profile')
    @UseGuards(AuthGuard())
    async getUserProfile(@Req() request) {
        const userId = request.user.id;
        return this.usersService.getUserProfile(userId);
    }


    @Put('profile')
    @UseGuards(AuthGuard())
    async editUserProfile(@Req() request, @Body() updatedUser: User) {
        const userId = request.user.id;
        try {
            await this.usersService.editUserProfile(userId, updatedUser);
            return 'User profile updated successfully';
        } catch (error) {
            throw new Error('Failed to update user profile');
        }
    }
}

function generateAuthToken(user: (import("mongoose").Document<unknown, {}, User> & User & { _id: import("mongoose").Types.ObjectId; })[]) {
    throw new Error("Function not implemented.");
}
