import { model, Schema } from 'mongoose';

type Card = {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<Card>({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default model<Card>('Card', cardSchema);
