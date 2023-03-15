import "../com.css";
import React, { useEffect,useState } from "react";
import Table from "react-bootstrap/Table";
import {useFormik} from 'formik'
// import { getUserData } from "../api/userapi";
import { useDispatch,useSelector} from "react-redux";
import { deleteThunk, thunkUserData } from "../slice/getdataslice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


const GetUser = () => {
  // const [userData, setUserData] = useState([]);
   const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

const dispatch =useDispatch();
// const navigate =useNavigate();


const {allData:userData,isLoading,hasError} = useSelector((state) => state.userdata);

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

 
const handleDelete= (id)=>{
  try{

     dispatch(deleteThunk(id));
    // navigate("/");
  }catch(err){
    return console.log(`Failed to delete the post ${err}`);
  }
   
}

const formik = useFormik({
  initialValues:{
      name:'',
      email:'',
      author:''
  }
})

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
                           className="border border-dark rounded-top w-75"
                           onChange={formik.handleChange}
                           value={formik.values.name}
                         />
                         <br></br>
                         <label
                           className="m-4 font-weight-bolder"
                           htmlFor="email"
                         >
                           Enter Email
                         </label>
                       </Form>
                     </Modal.Body>
                     <Modal.Footer>
                       <Button variant="secondary" onClick={handleClose}>
                         Close
                       </Button>
                       <Button variant="primary" onClick={handleClose}>
                         Save Changes
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
                   <Button variant="outline-success">Update</Button>
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
