import React, { useContext } from "react";
import SavContext from "../../Contexts/SavContext";

const LineSav = ({ savivaldybe }) => {
  const { setDeleteData, setModalData } = useContext(SavContext);

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__image">
            {savivaldybe.image ? (
              <div className="img-bin">
                <img src={savivaldybe.image} alt={savivaldybe.title}></img>
              </div>
            ) : (
              <span className="red-image">No image</span>
            )}
          </div>
          <div className="line__content__info">
            <h3 className="line__content__title">{savivaldybe.title}</h3>
            <div className="home__buttons">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => setModalData(savivaldybe)}
              >
                Koreguoti
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setDeleteData(savivaldybe)}
              >
                Ištrinti
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LineSav;
