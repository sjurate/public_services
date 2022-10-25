import React, { useContext } from "react";
import KomentaraiContext from "../../Contexts/KomentaraiContext";
import LineKom from "./LineKom";

const ListKom = () => {
  const { komentarai } = useContext(KomentaraiContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Parašyti komentarai:</h5>

      <ul className="list-group">
        {komentarai?.map((k) => (
          <LineKom key={k.id} komentaras={k} />
        ))}
      </ul>
    </div>
  );
};

export default ListKom;
