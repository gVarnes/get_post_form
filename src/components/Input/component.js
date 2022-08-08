import React, { forwardRef, useState } from "react";
import "./index.scss";

const Input = forwardRef((props, ref) => {
  const [filename, setFilename] = useState("");
  const handlClickButton = (e) => {
    document.querySelector(".form__file").click();
  };

  const getFileName = (e) => {
    setFilename(e.target.files[0].name);
  };

  return props.type === "file" ? (
    <label className={`form__file-body mb-50`}>
      <button className="form__file-button" onClick={handlClickButton}>
        Upload
      </button>
      <div className="form__div">{filename}</div>
      <input
        ref={ref}
        className="form__file"
        onInput={getFileName}
        {...props}
      ></input>
    </label>
  ) : (
    <div className="form__input-body">
      <input
        className={`form__input ${props.dirty}`}
        ref={ref}
        {...props}
      ></input>
      <span className="form__placeholder">{props.holder}</span>
    </div>
  );
});

export default Input;
