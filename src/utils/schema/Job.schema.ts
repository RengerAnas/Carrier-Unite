import { stringValidation, yupObj } from "./validation.schema";


export const createJobSchema = yupObj.shape({

  title: stringValidation("Title"),
  description: stringValidation("Description"),
  address: stringValidation("Address"),
  salary: stringValidation("Salary"),
  noOfVacancy: stringValidation("No of Vacancy"),
  postedOn: stringValidation("Starting Date"),
  type: stringValidation("Type"),
  recruiter: stringValidation("Recruiter"),
  logo: stringValidation("Logo")
})