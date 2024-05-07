import React, { useState } from "react";
import { TfiSave } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl } from "../data/ConstTexts";
import { changePassword } from "../features/auth/login/loginSlice";
const Account = () => {
  const profile = useSelector((state) => state.login.profile);
  const { token } = useSelector((state) => state.login);
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [rep_password, setRep_password] = useState("");
  const [error, SetError] = useState("");
  const [success, SetSuccess] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (new_password === rep_password) {
      const json = {
        old_password: old_password,
        new_password: new_password,
      };
      let isCancelled = false;
      dispatch(changePassword({ token, json }))
        .unwrap()
        .then((res) => {
          setOld_password("");
          setNew_password("");
          setRep_password("");
          SetSuccess(res.data);
          SetError("");
        })
        .catch((err) => SetError(err));
      return () => {
        isCancelled = true;
      };
    } else {
      SetError(true);
    }
  };

  return (
    <div className="flex flex-wrap text-lg">
      <div className="bg-white p-3 shadow flex-1 m-5 rounded-lg">
        <div className="flex items-center justify-between px-10">
          <div className="font-bold text-colorTextDarkBlue px-3">
            Giňişleýin maglumat
          </div>
          <div>
            <img
              src={backendUrl + profile.image}
              className=" w-20 h-20"
              alt="person"
            />
          </div>
        </div>
        <div className="pt-5 text-colorTextDarkBlue">
          <div className="">
            <div className="grid grid-cols-3 pb-3">
              <div className="pr-5 col-span-1">Ady:</div>
              <div className=" col-span-2">{profile.first_name}</div>
            </div>
            <div className="grid grid-cols-3 pb-3">
              <div className="pr-5 col-span-1">Familiýa:</div>
              <div className=" col-span-2">{profile.last_name}</div>
            </div>
            <div className="grid grid-cols-3 pb-3">
              <div className="pr-5 col-span-1">Email:</div>
              <div className=" col-span-2">{profile.email}</div>
            </div>
            <div className="grid grid-cols-3 pb-3">
              <div className="pr-5 col-span-1">Mobile:</div>
              <div className=" col-span-2">{profile.mobile}</div>
            </div>
            <div className="grid grid-cols-3 pb-3">
              <div className="pr-5 col-span-1">Phone:</div>
              <div className=" col-span-2">{profile.phone}</div>
            </div>
            <div className="grid grid-cols-3 pb-3">
              <div className="pr-5 col-span-1">Adress:</div>
              <div className=" col-span-2">{profile.address}</div>
            </div>
            <div className="grid grid-cols-3 pb-3">
              <div className="pr-5 col-span-1">Başlan wagty:</div>
              <div className=" col-span-2">{profile.started_working}</div>
            </div>
            <div className="grid grid-cols-3 pb-3">
              <div className="pr-5 col-span-1">Goşmaça maglumat:</div>
              <div className=" col-span-2">{profile.extra_info}</div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex-1 bg-white m-5 p-3 shadow rounded-lg">
        <div className="font-bold text-colorTextDarkBlue px-3">
          Paroly çalyşmak
        </div>
        <div className="pt-5">
          <div className="py-5">
            <label
              htmlFor="old_password"
              className="p-2 font-bold text-colorTextDarkBlue"
            >
              Köne parol:
            </label>
            <div className="flex items-center border-b border-blue-500 py-2">
              <input
                value={old_password}
                onChange={(e) => setOld_password(e.target.value)}
                className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none w-full"
                type="text"
                id="old_password"
                name="old_password"
                placeholder="Köne parol"
              />
            </div>
          </div>

          <div className="py-5">
            <label
              htmlFor="new_password"
              className="p-2 font-bold text-colorTextDarkBlue"
            >
              Täze parol:
            </label>
            <div className="flex items-center border-b border-blue-500 py-2">
              <input
                value={new_password}
                onChange={(e) => setNew_password(e.target.value)}
                className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none w-full"
                type="text"
                id="new_password"
                name="new_password"
                placeholder="Täze parol"
              />
            </div>
          </div>

          <div className="py-5">
            <label
              htmlFor="rep_password"
              className="p-2 font-bold text-colorTextDarkBlue"
            >
              Täze paroly gaýtala:
            </label>
            <div className="flex items-center border-b border-blue-500 py-2">
              <input
                value={rep_password}
                onChange={(e) => setRep_password(e.target.value)}
                className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none w-full"
                type="text"
                id="rep_password"
                name="rep_password"
                placeholder="Täze parol"
              />
            </div>
          </div>
          <div className="flex justify-end px-10 text-blue-600">
            <TfiSave
              onClick={handleSubmit}
              className="cursor-pointer"
              size={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
