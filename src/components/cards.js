import "../com.css";
import { useSelector} from "react-redux";
import CardData from "./carddata";

const Cards = () => {

  const {
    isLoading,
    hasError,
    allData: userData,
  } = useSelector((state) => state.userdata);

  return (
    <>
      {isLoading && <div>Loading....</div>}

      <div class="row" style={{ marginLeft: 200 }}>
        {userData && userData.map((data) => <CardData data={data} />)}
      </div>
      {hasError && <div>Something went wrong...</div>}
    </>
  );
};

export default Cards;
