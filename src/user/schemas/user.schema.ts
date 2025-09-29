import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { formatDate } from 'src/common/dayjs';
export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    versionKey: false, // 去掉 `__v`
    transform: function (doc, ret: UserDocument) {
      const { _id, createdAt, ...rest } = ret;
      return { userId: _id, createdAt: formatDate(createdAt), ...rest };
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

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  sex: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
