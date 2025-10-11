import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { formatDate } from 'src/common/dayjs';
export type UserDocument = HydratedDocument<User>;

@Schema()
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
