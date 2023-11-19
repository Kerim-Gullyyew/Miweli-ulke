import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateAddressInfo } from "../../store/features/auth/authSlice";
const EditeAdress = () => {
  const lang = localStorage.getItem('userLanguage');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state?.auth);
  const addres = address[id];
  const [mobile, setMobile] = useState("+993"+addres.mobile);
  const [fullname, setFullName] = useState(addres.fullname);
  const [email, setEmail] = useState(addres.email);
  const [addressLine1, setAddressLine1] = useState(addres.address_line1);
  const [addressLine2, setAddressLine2] = useState(addres.address_line2);
  const initilgender = useState(addres.gender);
  const [error, setError] = useState('');
  const [gender, setGender] = useState(addres.gender);
  const onMobileChanged = (e) => {
      let mobile = e.target.value;
      if (Number(mobile) || mobile === "" || mobile === "+") {
        if (mobile.length > 12) {
          return;
        }
        if (
          mobile[0] === "+" &&
          mobile[1] === "9" &&
          mobile[2] === "9" &&
          mobile[3] === "3"
        ) {
          setMobile(mobile);
        }
      } else {
        return;
      }
  };
  const onFullNameChanged = (e) => {
    setFullName(e.target.value);
  };
  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };
  const onAddressLine1Changed = (e) => {
    setAddressLine1(e.target.value);
  };
  const onAddressLine2Changed = (e) => {
    setAddressLine2(e.target.value);
  };
  const add_id = addres.id;
  const { id: user_id } = useSelector((state) => state.auth.profile.user);
  const mobil = mobile.slice(-8);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 12) {
      const formData = new FormData();
      formData.append("id", add_id);
      formData.append("mobile", mobil);
      formData.append("fullname", fullname);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("address_line1", addressLine1);
      formData.append("address_line2", addressLine2);
      formData.append("user", user_id);
      dispatch(updateAddressInfo({ token, formData }));
      navigate("/account/address");
      setMobile("+993");
      setFullName("");
      setEmail("");
      setAddressLine1("");
      setAddressLine2("");
    }else{
      setError("Telefon belginiz doly dal")
    }
  };
  return (
    <>
      <div className="col-span-9 gap-4">
        <div>
          <Link to="/account/address">
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-400 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
            >
              {lang === "tm" ? "Yza dolanmak" : "Назад"}
            </button>
          </Link>
        </div>

        <div className="contain">
          <div className=" shadow px-6 py-7 rounded-2xl overflow-hidden">
            <h2 className=" text-red-600 text-center pb-4">{error}</h2>
            <h2 className="text-center text-2xl uppercase font-medium mb-1 py-5">
            {lang === "tm" ? "Adres Goşmak" : "Добавить адрес"}
            </h2>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className=" grid lg:grid-cols-3 lg:gap-3 md:grid-col-1 md:gap-6">
                <div>
                  <label htmlFor="name" className="text-gray-600 mb-2 block">
                  {lang === "tm" ? "Telefon" : "Телефон"}
                  </label>
                  <input
                    value={mobile}
                    onChange={onMobileChanged}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="text-gray-600 mb-2 block">
                  {lang === "tm" ? "Doly ady" : "Полная имя"}
                  </label>
                  <input
                    value={fullname}
                    onChange={onFullNameChanged}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="text-gray-600 mb-2 block">
                  {lang === "tm" ? "Jynsy" : "Пол"}
                  </label>

                  <select
                    onChange={(e) => setGender(e.target.value)}
                    id="supplier"
                    name="supplier"
                    autoComplete="supplier-name"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white   shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {initilgender === 1 ? (
                      <>
                        <option value="1"> {lang === 'tm' ? "Erkek" : "Мужчина"}</option>
                        <option value="0"> {lang === 'tm' ? "Aýal" : "Женщина"}</option>
                      </>
                    ) : (
                      <>
                        <option value="0"> {lang === 'tm' ? "Aýal" : "Женщина"}</option>
                        <option value="1"> {lang === 'tm' ? "Erkek" : "Мужчина"}</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="text-gray-600 mb-2 block">
                  {lang === 'tm' ? "Email" : "Почта"}
                  </label>
                  <input
                    value={email}
                    onChange={onEmailChanged}
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="text-gray-600 mb-2 block">
                  {lang === 'tm' ? "Adres 1" : "Адрес 1"}
                  </label>
                  <textarea
                    value={addressLine1}
                    onChange={onAddressLine1Changed}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="text-gray-600 mb-2 block">
                  {lang === 'tm' ? "Adres 2" : "Адрес 2"}
                  </label>
                  <textarea
                    value={addressLine2}
                    onChange={onAddressLine2Changed}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                >
                  {lang === "tm" ? "Adresi Üýtget" : "Изменить адрес"}
                  
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditeAdress;
