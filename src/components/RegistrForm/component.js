import React, { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/slices/userSlice";

import * as yup from "yup";

import Input from "../Input/component";
import Button from "../Button/component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const FILE_SIZE = 5000000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg"];

const regExpPhoneNumber =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const schema = yup.object().shape({
  name: yup.string().min(2).max(60).required("You have to enter a name"),
  email: yup.string().email().required("You have to enter an email"),
  phone: yup
    .string()
    .min(13)
    .max(13)
    .matches(regExpPhoneNumber)
    .required("You have to enter a phone number"),
  position: yup.string().required("Choose a position"),
  photo: yup
    .mixed()
    .required("You need to send image")
    .test("fileSize", "The file is to large", (value) => {
      return value.length && value[0].size <= FILE_SIZE;
    })
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value.length && SUPPORTED_FORMATS.includes(value[0].type)
    )
    .required("You have to enter an image"),
});

const RegistrForm = () => {
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, dirtyFields },
    watch,
  } = useForm({
    defaultValues: {
      phone: "+380",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const watchPos = watch("position");

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach((item) => {
      if (item[0] === "photo") {
        formData.append(item[0], item[1][0]);
      } else if (item[0] === "position") {
        positions.forEach((pos) => {
          pos.name === item[1] && formData.append("position_id", pos.id);
        });
      } else {
        formData.append(item[0], item[1]);
      }
    });

    const request = await fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users",
      {
        headers: {
          token,
        },
        method: "POST",
        body: formData,
      }
    );
    const resp = await request.json();
    if (resp.success) {
      navigate("/success", { replace: true });
      dispatch(fetchUsers());
    }
  };

  useEffect(() => {
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
      .then((data) => data.json())
      .then((res) => setPositions(res.positions));

    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
      .then((data) => data.json())
      .then((res) => setToken(res.token));
  }, []);

  return (
    <div className="register container">
      <div className="register__title title mb-50">
        Working with POST request
      </div>
      <form
        className="register__form form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form__information">
          <Input
            {...register("name")}
            dirty={dirtyFields["name"] && "dirty"}
            holder="Enter your name"
          />
          <Input
            {...register("email")}
            dirty={dirtyFields["email"] && "dirty"}
            holder="Enter your email"
          ></Input>
          <Input {...register("phone")}></Input>
        </div>
        <ul className="form__list">
          <h3 className="form__list-title">Select your position</h3>
          {positions.map((pos, i) => (
            <li className="form__list-item mb-50" key={i}>
              <label
                className={`form__radio-label ${
                  watchPos === pos.name && "active"
                }`}
              >
                <input
                  type="radio"
                  className="form__radio"
                  value={pos.name}
                  {...register("position")}
                ></input>
                {pos.name}
              </label>
            </li>
          ))}
        </ul>
        <Input type="file" {...register("photo")}></Input>
        <Button type="submit" disabled={!isDirty || !isValid}>
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default RegistrForm;
