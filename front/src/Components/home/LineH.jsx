import React, { useContext } from "react";
import HomeContext from "../../Contexts/HomeContext";

const LineH = ({ komentaras }) => {
  const { setModalData, filterWhat, filterOn, setKomentarai, komentarai } =
    useContext(HomeContext);

  const filterBySavivaldybe = () => {
    filterOn.current = !filterOn.current;
    if (!filterOn.current) {
      setKomentarai((prevKom) => prevKom.map((k) => ({ ...k, show: true })));
      filterWhat.current = null;
    } else {
      setKomentarai((prevKom) => [
        ...prevKom.map((k) =>
          k.savivaldybe === komentaras.savivaldybe
            ? { ...k, show: true }
            : { ...k, show: false }
        ),
      ]);
      filterWhat.current = komentaras.savivaldybe;
    }
  };

  // const filterByColor = () => {
  //   if (!filterOn.current) {
  //     setClothes((prevClothes) =>
  //       prevClothes.map((c) => ({ ...c, show: true }))
  //     );
  //     filterWhat.current = null;
  //   } else {
  //     setClothes((prevMovies) =>
  //       prevMovies.map((c) =>
  //         c.color === clothe.color
  //           ? { ...c, show: true }
  //           : { ...c, show: false }
  //       )
  //     );
  //     filterWhat.current = clothe.color;
  //   }
  //   filterOn.current = !filterOn.current;
  // };

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__info">
            <div
              className="line__content__savivaldybe click-link"
              onClick={filterBySavivaldybe}
            >
              {komentaras.savivaldybe}
            </div>
            <div className="line__content__sritis click-link">
              {komentaras.sritis}
            </div>
            <div className="line__content__post">{komentaras.post}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LineH;
