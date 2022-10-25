import React, { useContext } from "react";
import KomentaraiContext from "../../Contexts/KomentaraiContext";

const LineKom = ({ komentaras }) => {
  const { setKomentaras, setDeleteData } = useContext(KomentaraiContext);

  const approve = (id) => {
    setKomentaras({
      id,
      status: 1,
    });
  };

  const remove = (id) => {
    setDeleteData({ id });
  };

  return (
    <li className="list-group-item">
      <ul className="comment">
        <li key={komentaras.id} className="list-group-item">
          <h3>Komentaras # {komentaras.id}</h3>
          <div>{o.type}</div>
          <div className="comment-details">
            <div>{komentaras.savivaldybe}</div>
            <div>{komentaras.sritis}</div>
          </div>
          <div className="comment-status">
            {komentaras.status === 0 ? (
              <div>Nepatvirtintas</div>
            ) : (
              <div style={{ color: "green" }}>Patvirtintas</div>
            )}
          </div>
          <div className="manage-comment-btns">
            <button
              onClick={() => approve(komentaras.id)}
              type="button"
              className="btn btn-outline-success"
            >
              Patvirtinti
            </button>
            <button
              onClick={() => remove(komentaras.id)}
              type="button"
              className="btn btn-outline-danger"
            >
              Ištrinti
            </button>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default LineKom;
