import Validator from "validatorjs";

//Student Register Follower

const studentValidation = {
  student_name: "required|min:4|max:20",
  father_name: "required|min:6|max:30",
  dob: "required",
  address: "required|min:4|max:20",
  city: "required|min:4|max:20",
  state: "required|min:4|max:20",
  pin: "required|min:6|max:6",
  phone_number: "required|min:10|max:10",
  email: "required|email",
  selectedClass: "required",
  marks: "required|numeric|min:0|max:100",
  enrolled_date: "required",
};

export const studentSingleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  if (studentValidation[key]) {
    const validation = new Validator(
      { [key]: value },
      { [key]: studentValidation[key] }
    );
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};

export const studentAllFieldsValidation = (data) => {
  const validation = new Validator(data, studentValidation);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};
