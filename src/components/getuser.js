import "../com.css";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useFormik } from "formik";
// import { getUserData } from "../api/userapi";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserThunk,
  deleteThunk,
  thunkUserData,
} from "../slice/getdataslice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";

const GetUser = () => {
  // const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  // const navigate =useNavigate();

  const {
    allData: userData,
    isLoading,
    hasError,
  } = useSelector((state) => state.userdata);

  console.log("Loading", isLoading);
  console.log("Error", hasError);

  // console.log("Userdata in UI : ", userData)

  useEffect(() => {
    // const ts = getUserData();
    // const printAddress = () => {
    // ts.then((a) => {
    // console.log(a);
    // setUserData(a);
    // });
    // };

    // printAddress();

    console.log("step 1111");
    dispatch(thunkUserData());
  }, []);

  const handleDelete = (id) => {
    try {
      dispatch(deleteThunk(id));
      // navigate("/");
    } catch (err) {
      return console.log(`Failed to delete the post ${err}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      author: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(addUserThunk(values));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be more than 1 charecter")
        .max(15, "Name must be 15 charecter or less")
        .required("Required"),
      email: Yup.string().email("Invalid Email Address").required("Required"),
      author: Yup.string()
        .max(20, "Author name must have 20 or less charecter")
        .required("required"),
    }),
  });
  const handleSetFormValues = (data) => {
    formik.setValues({
      name: `${data.name}`,
      email: `${data.email}`,
      author: `${data.author}`,
    });
  };
  const openUpdateModal = (data) => {
    handleShow();
    handleSetFormValues(data);
  };

  return (
    <>
      {isLoading && <div>Loading....</div>}
      {userData && (
        <div className="container">
          <Table striped bordered hover>
            <thead>
              <tr className="addButton">
                <th colSpan={4}>
                  <Button variant="primary" onClick={handleShow}>
                    Add User
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formik.handleSubmit}>
                      <Modal.Body>
                        <Form>
                          <label
                            className="m-4 font-weight-bolder"
                            htmlFor="name"
                          >
                            Enter Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="string"
                            placeholder="Name"
                            className="border border-dark rounded-top w-75"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          <br></br>
                          <hr />
                          <label
                            className="m-4 font-weight-bolder"
                            htmlFor="email"
                          >
                            Enter Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="string"
                            placeholder="Email"
                            className="border border-dark rounded-top w-75"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                          />
                          <br></br>
                          <hr />
                          <label
                            className="m-4 font-weight-bolder"
                            htmlFor="auther"
                          >
                            Enter Author Name
                          </label>
                          <input
                            id="author"
                            name="author"
                            type="string"
                            placeholder="Auther name"
                            className="border border-dark rounded-top w-75"
                            onChange={formik.handleChange}
                            value={formik.values.author}
                          />
                          <hr />
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={handleClose}
                        >
                          Save
                        </Button>
                      </Modal.Footer>
                    </form>
                  </Modal>
                </th>
              </tr>
            </thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Author</th>
              <th></th>
              <th></th>
            </tr>
            {userData.map((data) => (
              // <table key={data.id}>
              <tbody>
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.author}</td>
                  <td>
                    <Button
                      variant="outline-success"
                      onClick={()=>openUpdateModal(data)}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      className="btn"
                      onClick={() => {
                        handleDelete(data.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      )}

      {hasError && <div>Something went wrong...</div>}
    </>
  );
};

export default GetUser;
