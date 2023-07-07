import { useEffect } from "react";
import style from "../styles/Card.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { addFav, removeFav } from "../redux/actions";

function Card({ char, onClose, myFavorites, removeFav, addFav, inFav }) {
  const [isFav, setIsFav] = useState(false);
  console.log(":::::::", myFavorites);
  const { id, name, gender, species, origin, image, status } = char;
  const handleFavorite = function () {
    if (isFav) {
      setIsFav(false);
      removeFav(id);
    } else {
      setIsFav(true);
      addFav(char);
    }
  };

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  return (
    <div className={style.card}>
      <div className={style.close}>
        {isFav ? (
          <button onClick={handleFavorite}>❤️</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )}
        {inFav ? null : <button onClick={() => onClose(id)}>X</button>}
      </div>
      <div className={style.info}>
        <Link className={style.link} to={`/detail/${id}`}>
          <h2>{name.slice(0, 16)}</h2>
          <h2>{species}</h2>
          <img src={image} alt={name} />
        </Link>
      </div>
    </div>
  );
}

function mapState(state) {
  return {
    myFavorites: state.myFavorites,
  };
}
function mapDispatch(dispatch) {
  return {
    addFav: function (char) {
      dispatch(addFav(char));
    },
    removeFav: function (id) {
      dispatch(removeFav(id));
    },
  };
}

export default connect(mapState, mapDispatch)(Card);
