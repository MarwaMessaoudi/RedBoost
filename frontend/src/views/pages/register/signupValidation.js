import * as Yup from 'yup'
import 'yup-phone-lite'

//  REGEX for Email
const emailPattern =
  /^(?!.*[._-]{2})(?!.*@\w*\d)(?!.*[@._-][^\w.-])[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/

//  REGEX for UserName
const usernamePattern = /^[a-zA-Z\s]+$/
export const signupValidation = Yup.object({
  username: Yup.string()
    .matches(usernamePattern, 'Invalid UserName')
    .required('Required')
    .min(6, 'at least 6 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(emailPattern, 'Invalid email address')
    .required('Required'),
  // .phone("TN", "Not valid") FOR REVIEW!!!!!!!!!!!!!!!!!!!!!!!!!!;
  phone: Yup.string().phone('TN', 'Not valid').required('Required'),
  role: Yup.string()
    .oneOf([
      'superAdmin',
      'CEO',
      'regionalManager',
      'projectEmployee',
      'marcomManager',
      'financialManager',
    ])
    .required('Required'),
  department: Yup.string()
    .oneOf(['REGIONALS', 'FINANCE', 'MARCOM', 'MANAGER']) // Add more department options if needed
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'At least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
      'Password should be combination of one uppercase , one lower case, one special character, one digit and min 8 , max 20 char long',
    ),
  confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Not matched')
    .required('Required'),
})

export default signupValidation
