import Card from "./Card";
import style from "../styles/Cards.module.css";
import { useSelector } from "react-redux";
import Paginate from "./Paginate";

export default function Cards({ onClose }) {
  const { characters, numPage } = useSelector((state) => state);
  console.log(characters);
  const cantCharPerPage = 6;
  let desde = (numPage - 1) * cantCharPerPage;
  let hasta = numPage * cantCharPerPage;
  let cantPage = Math.floor(characters.length / cantCharPerPage);
  const viewCharacters = characters?.slice(desde, hasta);

  return (
    <div>
      <div className={style.cards}>
        {viewCharacters?.map((char, index) => {
          return <Card key={char.id} char={char} onClose={onClose} />;
        })}
      </div>
      <div>

      </div>
      <Paginate numPage={numPage} cantPage={cantPage} />
    </div>
  );
}
