import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import debounce from "lodash.debounce";
import InputFields from "../../reusable/InputField";
import FieldSelect from "../../reusable/FieldSelect";
import {
  studentAllFieldsValidation,
  studentSingleFieldValidation,
} from "../../reusable/validation";

const Registration = (props) => {
  const date = new Date();

  const formatedDate = `${date.getFullYear()}-${
    date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`
  }-${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`;

  const validDOB = `${date.getFullYear() - 10}-${
    date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`
  }-${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`;

  const [studentDetails, setStudentDetail] = useState({
    student_name: "",
    father_name: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    phone_number: "",
    email: "",
    marks: "",
    selectedClass: "",
    enrolled_date: formatedDate,
  });

  const [formError, setFormError] = useState({});
  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { isValid, errors } = studentSingleFieldValidation({
      key: name,
      value,
    });
    if (!isValid) {
      setFormError({ ...formError, [name]: errors[name] });
    } else {
      setFormError({ ...formError, [name]: null });
    }
  }, 1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = studentAllFieldsValidation(studentDetails);
    if (!isValid) {
      setFormError(errors);
      alert("Field Detail Not valid");
    } else {
      if (props.editMode) {
        saveEditedDetail();
      } else {
        saveDetail();
      }
      props.getUpdatedList();
      props.handleModal("close");
    }
  };

  const saveDetail = () => {
    const registeredStudent = JSON.parse(localStorage.getItem("students"));
    const existing = registeredStudent
      .map((e) => e.email)
      .filter((i) => i === studentDetails.email);
    if (existing.length > 0) {
      alert("Email is already register.");
    } else {
      const newArray = [...registeredStudent];
      newArray.push(studentDetails);
      const stringifiedData = JSON.stringify(newArray);
      localStorage.setItem("students", stringifiedData);
    }
  };

  const saveEditedDetail = () => {
    const registeredStudent = JSON.parse(localStorage.getItem("students"));
    const existing = registeredStudent.filter(
      (i) => i.email !== studentDetails.email
    );
    const newArray = [...existing];
    newArray.push(studentDetails);
    const stringifiedData = JSON.stringify(newArray);
    localStorage.setItem("students", stringifiedData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    debounceSingleFieldValidation({ name, value });
  };

  useEffect(() => {
    if (props.userEmail) {
      const registeredStudent = JSON.parse(localStorage.getItem("students"));
      const existing = registeredStudent.filter(
        (i) => i.email === props.userEmail
      );
      const {
        student_name,
        father_name,
        dob,
        address,
        city,
        state,
        pin,
        phone_number,
        email,
        marks,
        selectedClass,
      } = existing[0];
      setStudentDetail({
        student_name,
        father_name,
        dob,
        address,
        city,
        state,
        pin,
        phone_number,
        email,
        marks,
        selectedClass,
        enrolled_date: formatedDate,
      });
    }
  }, [props, formatedDate]);
  const {
    student_name,
    father_name,
    dob,
    address,
    city,
    state,
    pin,
    phone_number,
    email,
    marks,
    enrolled_date,
    selectedClass,
  } = studentDetails;

  return (
    <div>
      <Modal show={props.open} onHide={() => props.handleModal("close")}>
        <Modal.Header>
          <b>Student Registration</b>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <InputFields
              name="student_name"
              type="text"
              value={student_name}
              onChange={handleChange}
              placeholder="Student Name"
              error={formError["student_name"]}
            />
            <InputFields
              name="father_name"
              type="text"
              value={father_name}
              onChange={handleChange}
              placeholder="Father Name"
              error={formError["father_name"]}
            />
            <InputFields
              name="dob"
              type="date"
              value={dob}
              onChange={handleChange}
              placeholder="DOB"
              error={formError["dob"]}
              max={validDOB}
            />
            <InputFields
              name="address"
              type="text"
              value={address}
              onChange={handleChange}
              placeholder="Address"
              error={formError["address"]}
            />
            <InputFields
              name="city"
              type="text"
              value={city}
              onChange={handleChange}
              placeholder="City"
              error={formError["city"]}
            />
            <InputFields
              name="state"
              type="text"
              value={state}
              onChange={handleChange}
              placeholder="State"
              error={formError["state"]}
            />
            <InputFields
              name="pin"
              type="text"
              value={pin}
              onChange={handleChange}
              placeholder="Pin Code"
              error={formError["pin"]}
            />
            <InputFields
              name="phone_number"
              type="text"
              value={phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
              error={formError["phone_number"]}
            />
            <InputFields
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              disabled={props.editMode ? true : false}
              error={formError["email"]}
            />
            <FieldSelect
              error={formError["selectedClass"]}
              onChange={handleChange}
              value={selectedClass}
              selectList={[1, 2, 3, 4, 5]}
              name="selectedClass"
              title="Select Class"
              type="select"
              placeholder="Select Class"
            />
            <InputFields
              name="marks"
              type="text"
              value={marks}
              onChange={handleChange}
              placeholder="Marks"
              error={formError["marks"]}
            />
            <InputFields
              name="enrolled_date"
              type="date"
              value={enrolled_date}
              onChange={handleChange}
              placeholder="Enrolled Date"
              error={formError["enrolled_date"]}
            />
            <Button variant="primary" type="submit">
              Save Details
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Registration;
