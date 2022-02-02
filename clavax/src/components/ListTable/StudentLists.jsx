import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { TABLE_HEADING } from "../../reusable/constant";
import StudentDetail from "../StudentDetail/StudentDetail";

const StudentLists = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [studentDetail, setStudentDetail] = useState({});

  const viewDetail = (text, email) => {
    if (text === "open" && email) {
      const detail = props.studentsList.filter((i) => i.email === email);
      setOpenModal(true);
      setStudentDetail(detail);
    } else if (text === "close") {
      setOpenModal(false);
    } else {
      setOpenModal(false);
    }
  };
  return (
    <div>
      {props.studentsList.length <= 0 ? (
        <div className="justify-content-center d-flex">
          <h3>No registration found</h3>
        </div>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>SNo.</th>
              {TABLE_HEADING.map((headingName, index) => (
                <th key={index}>{headingName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.studentsList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td
                    className="cursor-pointer"
                    onClick={() => viewDetail("open", item?.email)}
                  >
                    {item?.student_name}
                  </td>
                  <td>{item?.email}</td>
                  <td>{item?.phone_number}</td>
                  <td>{item?.selectedClass}</td>
                  <td>{item?.marks}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => props.handleModal("open", item?.email)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {openModal && studentDetail && (
        <StudentDetail
          onHide={viewDetail}
          show={openModal}
          detail={studentDetail[0]}
        />
      )}
    </div>
  );
};

export default StudentLists;
