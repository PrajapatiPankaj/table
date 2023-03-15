import "../com.css";
import React, { useEffect } from "react";
// import { getUserData } from "../api/userapi";
import { useDispatch,useSelector} from "react-redux";
import { thunkUserData } from "../slice/getdataslice";
// import { useDispatch } from "react-redux";


const GetUser = () => {
  // const [userData, setUserData] = useState([]);
const dispatch =useDispatch();


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

 


 return (
   <>
     {isLoading && <div>Loading....</div>}
     {userData && <div className="container">
       <table>
         <tr>
           <th>Name</th>
           <th>Email</th>
           <th>Address</th>
         </tr>
         {userData.map((data) => (
           // <table key={data.id}>
           <tr key={userData.id}>
             <td>{data.name}</td>
             <td>{data.email}</td>
             <td>{data.address.city}</td>
             <td>
               <button className="btn">Update</button>
             </td>
             <td>
               <button className="btn">Delete</button>
             </td>
           </tr>
         ))}
       </table>
     </div>}

     {hasError&& <div>Something went wrong...</div>}
   </>
 );
};



export default GetUser;
