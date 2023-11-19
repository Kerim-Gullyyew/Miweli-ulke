import React from "react";
import { Link } from "react-router-dom";
import { getProfileInfo } from "../../store/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProfileInfo({ token }));
  }, [dispatch, token]);
  const lang = localStorage.getItem("userLanguage");
  const { profile } = useSelector((state) => state?.auth);

  return (
    <>
      <div className="col-span-9 gap-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="shadow rounded bg-white px-10 pt-6 pb-4">
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-800 text-lg">
                        {lang === "tm" ? "Şahsy profil" : "Личный профиль"}
                      </h3>
                      <Link to={`/account/profile/` + profile?.id} className="text-primary">
                        {lang === "tm" ? "Üýtget" : "Редактировать"}
                      </Link>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-gray-700 font-medium">
                        {profile?.name} {profile?.surname}
                      </h4>
                      <p className="text-gray-800">{profile?.email}</p>
                      <p className="text-gray-800">{profile?.address?.address_line1}</p>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
