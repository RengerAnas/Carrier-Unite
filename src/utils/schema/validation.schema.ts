import { object, string } from "yup";
import { emailReg } from "../../constants/Utils";

export const stringValidation = (name: string, min = 1, max = 255) => {
  return string()
    .required(`${(name as any)} ${("is required")}`)
    .min(min, `${(name as any)} ${("must be at least")} ${min} ${("characters long")}`)
    .max(max, `${(name as any)} ${("must be at most")} ${max} ${("characters long")}`)
    .trim();
};

export const customStringValidation = (message: string) => {
  return string().required(message).trim();
};

export const addStrValidation = () => {
  return customStringValidation(("Invalid Address Choose Different Address"));
};

export const yupObj = object();

export const Email = string()
  .matches(emailReg, { message: ("Invalid Email") })
  .required(("Email is required"));
