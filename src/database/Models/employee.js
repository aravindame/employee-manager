import mongoose from 'mongoose';

//Employee Schema for the mongoDB
const Schema = {
  first_name: String,
  last_name: String,
  email: String,
  number: String,
  gender: String,
  photo: String,
};

const EmployeeSchema = new mongoose.Schema(Schema);

const EmployeeModel = mongoose.models.Employee || new mongoose.model('Employee', EmployeeSchema);

export default EmployeeModel;
