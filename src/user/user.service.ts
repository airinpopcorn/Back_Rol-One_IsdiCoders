import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { iUser } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly User: Model<iUser>) {}
    async create(createUserDto: CreateUserDto) {
        const newUser = await this.User.create(createUserDto);
        return newUser;
    }

    async findAll() {
        return await this.User.find();
    }

    async findOne(id: string) {
        return await this.User.findById(id);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return this.User.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    async remove(id: string) {
        return await this.User.findByIdAndDelete(id);
    }
}
