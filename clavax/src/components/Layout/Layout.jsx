import React, { useState, useEffect } from "react";
import { Button, Pagination } from "react-bootstrap";
import StudentLists from "../ListTable/StudentLists";
import Registration from "../Registration/Registration";
const Layout = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [paginationCount, setPaginationCount] = useState(1);

  const handleModal = (text, email) => {
    if (text === "open" && !email) {
      setOpenModal(true);
    } else if (text === "open" && email) {
      setOpenModal(true);
      setUserEmail(email);
      setEditMode(true);
    } else if (text === "close") {
      setOpenModal(false);
    } else {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    getUpdatedList();
  }, []);

  let count = 0;
  const getUpdatedList = () => {
    const list = JSON.parse(localStorage.getItem("students"));
    const sliced = list.slice(0, 6);
    setStudentsList(sliced);
  };

  count = JSON.parse(localStorage.getItem("students")).length / 5;

  const handlePagination = (c) => {
    setPaginationCount(c + 1);
    const list = JSON.parse(localStorage.getItem("students"));
    let sliced = [];
    if (c > 0) {
      sliced = list.slice(0, 2 * (c + 1) + 6);
    } else {
      sliced = list.slice(0, 6);
    }
    setStudentsList(sliced);
  };

  return (
    <div className="p-5 mx-5">
      <div>
        <h3>Enrollment App</h3>
      </div>
      <div dir="rtl" className="my-5">
        <Button variant="success" onClick={() => handleModal("open")}>
          New Student
        </Button>
      </div>
      <div className="p-2 border">
        {studentsList ? (
          <StudentLists studentsList={studentsList} handleModal={handleModal} />
        ) : (
          <div className="justify-content-center d-flex">
            <h3>No registration found</h3>
          </div>
        )}
      </div>
      <div className="pagination justify-content-center d-flex my-3">
        <Pagination>
          {Array.from({ length: count + 1 }).map((_, index) => {
            return (
              <Pagination.Item
                key={index}
                active={paginationCount === index + 1}
                onClick={() => handlePagination(index)}
              >
                {index + 1}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </div>
      {openModal && (
        <Registration
          open={openModal}
          handleModal={handleModal}
          userEmail={userEmail}
          editMode={editMode}
          getUpdatedList={getUpdatedList}
        />
      )}
    </div>
  );
};

export default Layout;
