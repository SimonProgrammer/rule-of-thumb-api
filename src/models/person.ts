import { model, Schema, Document } from "mongoose";

const subSchema = new Schema({
    positive: {
        type: Number,
    },
    negative: {
        type: Number,
    },
});

interface IVote extends Document {
    positive: number;
    negative: number;
}

interface IPersonVote extends Document {
    code: string;
    type: string;
}

interface IPerson extends Document {
    name: string;
    code: string;
    description: string;
    category: string;
    pictureGrid: string;
    pictureList: string;
    lastUpdated: Date;
    votes: IVote;
}

const PersonSchema = new Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  pictureGrid: {
    type: String,
  },
  pictureList: {
    type: String,
  },
  lastUpdated: {
    type: Date,
  },
  votes: {
    type: subSchema
  }
},{ collection: 'persons' });

const PersonModel = model<IPerson>("Person", PersonSchema);

export { PersonModel, IPerson, IPersonVote };
