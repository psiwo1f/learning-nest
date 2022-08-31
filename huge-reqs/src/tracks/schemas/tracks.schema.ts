import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TracksDocument = Tracks & Document;

@Schema()
export class Tracks {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  trackerId: string;

  @Prop()
  date: string
}

export const TracksSchema = SchemaFactory.createForClass(Tracks);