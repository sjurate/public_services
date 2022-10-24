import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HomeContext from "../../Contexts/HomeContext";
import ListH from "./ListH";
import CreateH from "./CreateH";
import { authConfig } from "../../Functions/auth";

const MainH = () => {
  //const [userId, setUserId] = useState(0);
  const [clothes, setClothes] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [modalData, setModalData] = useState(null);
  const [order, setOrder] = useState(null);
  const filterOn = useRef(false);
  const filterWhat = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3003/home/clothes", authConfig())
      .then((res) => {
        if (filterOn.current) {
          setClothes(
            res.data.map((d, i) =>
              filterWhat.current === d.type
                ? { ...d, show: true, row: i }
                : { ...d, show: false, row: i }
            )
          );
          console.log(`atrenka: `);
        } else {
          setClothes(res.data.map((d, i) => ({ ...d, show: true, row: i })));
          console.log(res.data);
        }
      });
  }, [lastUpdate]);

  // CREATE ORDER

  useEffect(() => {
    if (order === null) {
      return;
    }
    axios
      .post(
        "http://localhost:3003/home/orders/" + order.clothe_id,
        order,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [order]);

  return (
    <HomeContext.Provider
      value={{
        clothes,
        setClothes,
        setModalData,
        modalData,
        setOrder,
        filterOn,
        filterWhat,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 col-md-12 col-sm-12">
            <ListH />
          </div>
        </div>
        <CreateH />
      </div>
    </HomeContext.Provider>
  );
};

export default MainH;
