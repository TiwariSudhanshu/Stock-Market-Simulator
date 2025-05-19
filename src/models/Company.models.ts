import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  sector: string;
  description: string;
  stockPrice: number;
  esgScore: number;
}


const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  sector: { type: String, required: true },
  description: { type: String, required: true },
  stockPrice: { type: Number, required: true },
  esgScore: { type: Number, required: true, min: 0, max: 100 },
}, {
  timestamps: true 
});


const Company: Model<ICompany> = model<ICompany>('Company', CompanySchema);

export default Company;
