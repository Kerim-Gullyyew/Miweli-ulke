import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateProfileInfo } from "../../store/features/auth/authSlice";
import { backendUrl } from "../../rootUrl";
const EditProfile = () => {
  const lang = localStorage.getItem("userLanguage");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state?.auth);
  const { profile } = useSelector((state) => state?.auth);
  const [email, setEmail] = useState(profile?.email);
  const [name, setName] = useState(profile?.name);
  const [surname, setSurname] = useState(profile?.surname);
  const { id: user_id } = useSelector((state) => state?.auth?.profile?.user);
  

  const [oldPhoto] = useState(profile?.avatar);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };
  const onNameChanged = (e) => {
    setName(e.target.value);
  };
  const onsurnameChanged = (e) => {
    setSurname(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("address", "");
    formData.append("avatar", selectedFile === undefined ? "" : selectedFile);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("user", user_id);
    dispatch(updateProfileInfo({ token, formData }));
    navigate("/account");
    setName("");
    setEmail("");
    setSurname("");
    setSelectedFile();
  };
  return (
    <>
      <div className="col-span-9 gap-4">
        <div>
          <Link to="/account">
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
            {/* <h2 className=" text-red-600 text-center pb-4">Error message</h2> */}
            <h2 className="text-center text-2xl uppercase font-medium mb-1 py-5">
            {lang === "tm" ? "Profil üytgetmek" : "Редактировать профиль"}
              
            </h2>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className=" grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 md:gap-6">
                <div>
                  <label htmlFor="name" className="text-gray-600 mb-2 block">
                  {lang === "tm" ? "Ady" : "Имя"}
                  </label>
                  <input
                    value={name || ""}
                    onChange={onNameChanged}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="text-gray-600 mb-2 block">
                  {lang === "tm" ? "Familiýa" : "Фамилия"}
                  </label>
                  <input
                    value={surname || ""}
                    onChange={onsurnameChanged}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-gray-600 mb-2 block">
                  {lang === 'tm' ? "Email" : "Почта"}
                  </label>
                  <input
                    value={email || ""}
                    onChange={onEmailChanged}
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 text-center p-6">
                  <div className="flex">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="file"
                    >
                      {lang === 'tm' ? "Awatar" : "Аватар"}
                    </label>
                    <div className=" flex">
                      <div className="mt-1 flex justify-center border-gray-300 px-1 pt-1 pb-1">
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          onChange={onSelectFile}
                          name="photo"
                        />
                      </div>
                      <div className="h-16 mt-1 flex rounded-md">
                        {preview ? (
                          selectedFile && <img src={preview} alt="Preview" />
                        ) : (
                          <img src={backendUrl + oldPhoto} alt={lang === 'tm' ? "Awatar ýok" : "Нет аватар"} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                >
                  {lang === 'tm' ? "Profili üýtget" : "Редактировать профиль"}
                  
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
