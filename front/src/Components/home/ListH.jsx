import React, { useContext, useEffect, useState } from "react";
import HomeContext from "../../Contexts/HomeContext";
import LineH from "./LineH";

const ListH = () => {
  const { komentarai, setKomentarai, filterOn, filterWhat } =
    useContext(HomeContext);

  const resetFilter = () => {
    setKomentarai((prevClothes) =>
      prevClothes.map((c) => ({ ...c, show: true }))
    );
    filterOn.current = false;
    filterWhat.current = null;
  };

  return (
    <>
      {/* <div className="card m-4">
        <h5 className="card-header">Sort</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortData.map((c) => (
                <option key={c.v} value={c.v}>
                  {c.t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div> */}
      <div className="card m-4">
        <h5 className="card-header">Komentarai:</h5>
        <div className="card-small-info">
          <small onClick={resetFilter} className="click-link">
            (rodyti visus komentarus)
          </small>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {komentarai?.map((k) =>
              k.show ? <LineH key={k.id} komentaras={k} /> : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListH;
