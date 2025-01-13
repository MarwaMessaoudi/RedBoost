import * as Yup from "yup";
// Form Validation using Yup
const emailPattern =
  /^(?!.*[._-]{2})(?!.*@\w*\d)(?!.*[@._-][^\w.-])[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
const signinValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .matches(emailPattern, "Invalid email address")
    .required("Required"),

  password: Yup.string()
    .required("Required")
    .min(8, "At least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password should be combination of one uppercase , one lower case, one special character, one digit and min 8 , max 20 char long"
    ),
});

export default signinValidation;
