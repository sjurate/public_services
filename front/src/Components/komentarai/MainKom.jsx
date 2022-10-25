import React, { useState, useEffect } from "react";
import axios from "axios";
import KomentaraiContext from "../../Contexts/KomentaraiContext";
import ListKom from "./ListKom";
import { authConfig } from "../../Functions/auth";

const MainKomentarai = () => {
  const [komentarai, setKomentarai] = useState(null);
  const [komentaras, setKomentaras] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // const reList = (data) => {
  //   const d = new Map();
  //   data.forEach((line) => {
  //     if (d.has(line.id)) {
  //       d.set(line.id, [...d.get(line.id), line]);
  //     } else {
  //       d.set(line.id, [line]);
  //     }
  //   });
  //   return [...d];
  // };

  // READ for list of KOMENTARAI (for admin)

  useEffect(() => {
    axios
      .get("http://localhost:3003/home/komentarai", authConfig())
      .then((res) => {
        setKomentarai(res.data);
      });
  }, [lastUpdate]);

  // UPDATE KOMENTARAS (for admin)

  useEffect(() => {
    if (komentaras === null) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/komentarai/" + komentaras.id,
        komentaras,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [komentaras]);

  // DELETE KOMENTARAS (for admin)

  useEffect(() => {
    if (deleteData === null) {
      return;
    }
    axios
      .delete(
        "http://localhost:3003/home/komentarai/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  return (
    <KomentaraiContext.Provider
      value={{
        setKomentaras,
        komentarai,
        setDeleteData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 col-md-12 col-sm-12">
            <ListKom />
          </div>
        </div>
      </div>
    </KomentaraiContext.Provider>
  );
};

export default MainKomentarai;
