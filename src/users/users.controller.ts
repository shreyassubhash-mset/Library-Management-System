import { Controller, Get, Post, Put, Body, UseGuards, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createuser.dto";
import { LoginUserDto } from "./dto/loginuser.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./schema/users.schema";
import { UpdateUserDto } from "./dto/updateuser.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    registerUser(@Body() createUserDto: CreateUserDto): Promise<{ token: string }> {
        return this.usersService.register(createUserDto);
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
        return this.usersService.loginuser(loginUserDto);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    getUser(@Param('id') id: string): Promise<User> {
        return this.usersService.getUserDetails(id);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.editUser(id, updateUserDto);
    }

}
