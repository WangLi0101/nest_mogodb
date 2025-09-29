import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    versionKey: false, // 去掉 `__v`
    transform: function (doc, ret) {
      const { _id, ...rest } = ret;
      return { userId: _id, ...rest };
    },
  },
})
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
