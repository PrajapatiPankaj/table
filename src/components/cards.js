import "../com.css";
import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { MDBIcon } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// import {
//   thunkUserData,
// } from "../slice/getdataslice";

const Cards = () => {
  //   const dispatch = useDispatch();

  const {
    isLoading,
    hasError,
    allData: userData,
  } = useSelector((state) => state.userdata);

  //   useEffect(() => {
  //     //dispatch(thunkUserData());
  //   });

  return (
    <>
      {isLoading && <div>Loading....</div>}

      <div class="row" style={{ marginLeft: 200 }}>
        {userData &&
          userData.map((data) => (
            <div
              className="col-sm-2 col-lg-3"
              style={{ margin: 10 }}
              key={data.id}
            >
              <Card border="primary" key={data.id} className="cards">
                <Card.Header>
                  User-Data
                  <MDBIcon far icon="edit" className="text-info" />
                  <MDBIcon fas icon="trash-alt" className="text-danger" />
                </Card.Header>

                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text>
                    {data.email}
                    <br />
                    {data.author}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
      {hasError && <div>Something went wrong...</div>}
    </>
  );
};

export default Cards;
