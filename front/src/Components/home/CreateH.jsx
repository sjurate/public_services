import React, { useContext, useState, useEffect } from "react";
import HomeContext from "../../Contexts/HomeContext";
// import MessagesContext from "../../Contexts/MessagesContext";

const CreateH = () => {
  const [savivaldybe, setSavivaldybe] = useState("");
  const [sritis, setSritis] = useState("");
  const [post, setPost] = useState("");

  const { setCreateData, sritys, savivaldybes } = useContext(HomeContext);
  //const { setMsg } = useContext(MessagesContext);

  const addKomentaras = () => {
    setCreateData({
      savivaldybe: parseInt(savivaldybe),
      sritis: parseInt(sritis),
      post,
    });
    setSavivaldybe("");
    setSritis("");
    setPost("");
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">Parašyk komentarą</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Savivaldybė</label>
          <select
            className="form-select"
            value={savivaldybe}
            onChange={(e) => setSavivaldybe(e.target.value)}
          >
            <option value={0} disabled>
              Choose from list
            </option>

            {savivaldybes?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Sritis</label>
          <select
            className="form-select"
            value={sritis}
            onChange={(e) => setSritis(e.target.value)}
          >
            <option value={0} disabled>
              Choose from list
            </option>

            {sritys?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Komentaras</label>
          <input
            type="text"
            className="form-control"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <button
          onClick={addKomentaras}
          type="button"
          className="btn btn-outline-success"
        >
          Pridėti komentarą
        </button>
      </div>
    </div>
  );
};

export default CreateH;
