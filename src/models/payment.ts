import { model, Schema, Document } from "mongoose";

interface Filter {
  time: string
  type: string
}

interface IPayment extends Document {
  paymentType: string;
  paymentStatus: string;
  datePayment: Date;
  franchise: string;
  lastDigit: number;
  transactionId: string;
  amount: number;
  deductionStatus: boolean;
  deductionAmount: number;
}

const PaymentSchema = new Schema({
  paymentType: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
  datePayment: {
    type: Date,
  },
  franchise: {
    type: String,
  },
  lastDigit: {
    type: Number,
  },
  transactionId: {
    type: String,
  },
  amount: {
    type: Number,
  },
  deductionStatus: {
    type: Boolean,
  },
  deductionAmount: {
    type: Number,
  },
},{ collection: 'payments' });

const PaymentModel = model<IPayment>("Payment", PaymentSchema);

export { PaymentModel, IPayment, Filter };
