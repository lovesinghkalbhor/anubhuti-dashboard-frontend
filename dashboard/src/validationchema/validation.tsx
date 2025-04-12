import * as Yup from "Yup";

const registerValidationSchema = Yup.object({
  mobile: Yup.string()
    .min(3, `Mobile number should be 10 digits`)
    .required("Mobile number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  name: Yup.string().required("User Name is required"),
});

///////////////////////////////////////////////
///////////////////////////////////////////////
const loginValidationSchema = Yup.object({
  mobile: Yup.string()
    .min(3, `Mobile number should be 10 digits`)
    .required("Mobile number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

const UpdateUserValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  adhar_card: Yup.string().required("Adhar card is required"),
});

const ChangePasswordValidationSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const AddDonationValidationSchema = Yup.object({
  donorName: Yup.string()
    .required("Donor Name is required")
    .min(3, "Donor Name must be at least 3 characters")
    .max(50, "Donor Name cannot exceed 50 characters"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  // .matches(
  //   /^[1-9]\d{9}$/,
  //   "Phone Number must be a valid 10-digit Indian number"
  // ),
  aadhar: Yup.string()
    .nullable()
    .matches(/^\d{12}$/, "Aadhar Number must be a 12-digit number")
    .notRequired(),
  pan: Yup.string()
    .nullable()
    .matches(/^[A-Z]{5}\d{4}[A-Z]{1}$/, "PAN Card must be a valid format")
    .notRequired(),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters long"),
  amount: Yup.number()
    .nullable()
    .positive("Amount must be greater than zero")
    .integer("Amount must be an integer")
    .notRequired(),

  purpose: Yup.string()
    .required("Purpose is required")
    .min(10, "Purpose must be at least 10 characters long")
    .max(500, "Purpose cannot exceed 500 characters"),
});

export {
  AddDonationValidationSchema,
  registerValidationSchema,
  loginValidationSchema,
  UpdateUserValidationSchema,
  ChangePasswordValidationSchema,
};
