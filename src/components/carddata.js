import "../com.css";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { MDBIcon } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { deleteThunk, updateThunk } from "../slice/getdataslice";
import * as Yup from "yup";
import { useFormik } from "formik";

const CardData = ({ data }) => {
  const dispatch = useDispatch();
  const [val, setVal] = useState(true);

  console.log("ID IN CARD DATA:",data.id)

  const formik = useFormik({
    initialValues: {
      id:"",
      name: "",
      email: "",
      author: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(updateThunk(values))
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

  const updt = (data) => {
    const id = data.id;
    console.log("id when edit data", id);

    id === data.id
      ? setVal(false)(
          formik.setValues({
            id:data.id,
            name: data.name,
            email: data.email,
            author: data.author,
          })
        )
      : setVal(true);
  };


 

  const del = (id) => {
    console.log("id in del method ", id);
    dispatch(deleteThunk(id));
  };

  return (
    <div className="col-sm-2 col-lg-3" style={{ margin: 10 }} key={data.id}>
      <Card border="primary" key={data.id} className="cards">
        <Card.Header>
          User-Data
          <button onClick={() => updt(data)}>
            <MDBIcon far icon="edit" className="text-info" />
          </button>
          <button
            onClick={() => {
              del(data.id);
            }}
          >
            <MDBIcon fas icon="trash-alt" className="text-danger" />
          </button>
        </Card.Header>

        {val ? (
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>

            <Card.Text>
              {data.email}
              <br />
              {data.author}
            </Card.Text>
          </Card.Body>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <input
              id="name"
              name="name"
              type="string"
              placeholder="Name"
              className="border border-dark rounded-top w-75"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <br />
            <input
              id="email"
              name="email"
              type="string"
              placeholder="Email"
              className="border border-dark rounded-top w-75"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <br />
            <input
              id="author"
              name="author"
              type="string"
              placeholder="Auther name"
              className="border border-dark rounded-top w-75"
              onChange={formik.handleChange}
              value={formik.values.author}
            />
            <br />
            {val === false ? (
              <div>
                <button type="submit">
                  <MDBIcon fas icon="check" />
                </button>
                
                <button type="submit">
               <MDBIcon fas icon="times-circle" />
              
                </button>
              </div>
            ) : (
              <button onClick={() => updt(data)}>
                <MDBIcon far icon="edit" className="text-info" />
              </button>
            )}
          </form>
        )}
      </Card>
    </div>
  );
};

export default CardData;

//For Update
// const upDate=(data)=>{
//   console.log("Update Data through Val:",data)
//   setUpdata(data)
//    dispatch(updateThunk(data));
// }

// const handleUpdate = (data) => {
//   const id = data.id;

//   console.log("Id in handleUpdate:", id);
//   console.log("Id of initial Data:");
// };


  // const handleUpdate = (data) => {
  //   console.log("DATA ID:", data.id);
  //   console.log("DATA IN HANDLEUPDATE:", data);
  //   dispatch(updateThunk(data));
  // };