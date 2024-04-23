import * as yup from 'yup';
import {Email, stringValidation, yupObj} from './validation.schema';

export const registerSchema = () =>
  yupObj.shape({
    name: stringValidation('Name'),
    mobileNumber: stringValidation('Mobile Number'),
    email: Email,
    password: stringValidation('Password', 6, 15),
    address: stringValidation('Address'),
    gender: stringValidation('gender'),
    dateOfBirth: stringValidation('Date of Birth'),
    jobTitle: stringValidation('Job Title'),
    description: stringValidation('Description'),
  });

export const loginSchema = yupObj.shape({
  email: Email,
  password: stringValidation('Password').min(
    6,
    'Password must be at least 6 characters',
  ),
});

export const changePassSchema = () =>
  yupObj.shape({
    old_password: stringValidation('Old Password'),
    new_password: stringValidation('New Password', 6, 15),
    confirm_password: stringValidation('Confirm Password', 6, 15).oneOf(
      [yup.ref('new_password'), ''],
      'Passwords must match',
    ),
  });

export const editProfileSchema = () =>
  yupObj.shape({
    full_name: stringValidation('Full Name', 3, 30),
    addressline_1: stringValidation('Address Line 1', 5, 50),
    // addressline_2: stringValidation("Address Line 2", 5, 50),
    addressline_2: yup.string(),
    city: stringValidation('City', 3, 50),
    state: stringValidation('State', 3, 50),
    zipcode: stringValidation('Zip Code'),
  });
