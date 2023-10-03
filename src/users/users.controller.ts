import { Controller, Get, Post, Put, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createuser.dto";
import { LoginUserDto } from "./dto/loginuser.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    registerUser(@Body() createUserDto: CreateUserDto): Promise<{ token: string }> {
        return this.usersService.register(createUserDto);
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
        return this.usersService.login(loginUserDto);
    }
}
