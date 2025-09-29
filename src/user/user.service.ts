import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { ERROR_CODE, ForbiddenException } from 'src/common/error';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async findAll() {
    const res = await this.userModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return res;
  }

  findOne(id: string) {
    return this.userModel.findById(id).lean().exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  testError() {
    // throw new Error('test error');
    throw new ForbiddenException(ERROR_CODE.USER_ALREADY_EXISTS);
  }
}
