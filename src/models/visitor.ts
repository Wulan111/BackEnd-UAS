import mongoose, { Schema, Document} from 'mongoose';

// Definisikan interface Visitor
export interface Visitor extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  visitDate: Date;
}

// Definisikan schema Visitor
const VisitorSchema: Schema<Visitor> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  visitDate: { type: Date, default: Date.now },
});

// Buat model Visitor
const Visitor = mongoose.model<Visitor>('Visitor', VisitorSchema);

export default Visitor;