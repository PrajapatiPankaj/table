import "../com.css";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { MDBIcon } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { addUserThunk, deleteThunk, updateThunk } from "../slice/getdataslice";
import * as Yup from "yup";
import { useFormik } from "formik";
import CardData from "./carddata";

const Cards = () => {
  const dispatch = useDispatch();
  const [val, setVal] = useState(true);

  const {
    isLoading,
    hasError,
    allData: userData,
  } = useSelector((state) => state.userdata);

  //   useEffect(() => {
  //     //dispatch(thunkUserData());
  //   });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      author: "",
    },
    onSubmit: (values) => {
      console.log("values", values);

      values?.id
        ? dispatch(updateThunk(values))
        : dispatch(addUserThunk(values));
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
       ? (setVal(false))
         (formik.setValues(
           {
             name: data.name,
             email: data.email,
             author: data.author,
           }))
       : setVal(true);
    
   
    // dispatch(updateThunk(data));
  };

  const del = (id) => {
    console.log("id in del method ", id);
    dispatch(deleteThunk(id));
  };

  return (
    <>
      {isLoading && <div>Loading....</div>}

      <div class="row" style={{ marginLeft: 200 }}>
        {userData &&
          userData.map((data) => (
            <CardData data={data}/>
          ))}
      </div>
      {hasError && <div>Something went wrong...</div>}
    </>
  );
};

export default Cards;
