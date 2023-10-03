import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createuser.dto';
import { LoginUserDto } from './dto/loginuser.dto';
@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private jwtService: JwtService) {}
   
   async register(createUserDto: CreateUserDto): Promise<{ token: string }> {
      const { username, email, password } = createUserDto
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await this.userModel.create({
         username,
         email,
         password: hashedPassword
      })

      const token = this.jwtService.sign({ id: user._id })

      return { token }
   }

   async login(loginUserDto: LoginUserDto): Promise<{ token: string }>{
      const { email, password } = loginUserDto;
      const user = await this.userModel.findOne({ email })

      if(!user) {
         throw new UnauthorizedException('Invalid email or password!')
      }

      const isPassword = await bcrypt.compare(password, user.password)

      if(!isPassword) {
         throw new UnauthorizedException('Invalid email or password!')
      }

      const token = this.jwtService.sign({ id: user._id });
      return { token };
   }
}
