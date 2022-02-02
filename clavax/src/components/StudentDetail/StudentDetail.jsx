import React from "react";
import { Modal } from "react-bootstrap";
const StudentDetail = (props) => {
  const { show, onHide, detail } = props;

  return (
    <div>
      <Modal show={show} onHide={() => onHide("close")}>
        <Modal.Header>
          <h4>Student Detail</h4>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>Student Name</b> : {detail?.student_name}
          </p>
          <p>
            <b>Father Name</b> : {detail?.father_name}
          </p>
          <p>
            <b>D.O.B</b> : {detail?.dob}
          </p>
          <p>
            <b>Address</b> : {detail?.address}
          </p>
          <p>
            <b> City</b> : {detail?.city}
          </p>
          <p>
            <b>State</b> : {detail?.state}
          </p>
          <p>
            <b>PIN Code</b> : {detail?.pin}
          </p>
          <p>
            <b>Phone No</b> : {detail?.phone_number}
          </p>
          <p>
            <b>Email</b> : {detail?.email}
          </p>
          <p>
            <b>Class</b> : {detail?.selectedClass}
          </p>
          <p>
            <b>Marks</b> : {detail?.marks}%
          </p>
          <p>
            <b>Enrolled Date</b> : {detail?.enrolled_date}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentDetail;
