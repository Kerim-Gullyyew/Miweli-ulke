import React, { Fragment } from "react";
import call from "../../img/icons/call.svg";
import email from "../../img/icons/email.svg";
import SEO from "../../config/seo";
import instagram from "../../img/icons/instagram.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAbout } from "../../store/features/about/aboutSlice";
const About = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);
  const lang = localStorage.getItem("userLanguage");
  const { about } = useSelector((state) => state.about);
  return (
   <Fragment>
      <SEO
        titleTemplate={
          lang === "tm"
            ? "Biz barada"
            : "О нас"
        }
        description="Onlaýn söwda Türkmeninstan, Sowgatlar"
      />
      <div className="container px-6 mx-auto">
        <section className="mb-5 text-gray-800">
          <div className="container mx-auto xl:px-32 text-center lg:text-left">
            <div className="mb-12 lg:mb-0">
              <div className="block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  {about.company_name}
                </h2>
                <p className="text-gray-500 mb-6 pb-2 lg:pb-0">
                  {lang === 'tm' ? about.detail : about.detail_ru}
                </p>

                <div className=" grid grid-cols-1 items-center justify-around lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                  <div className=" px-2 py-2 flex h-14 ">
                    <img className="px-5" src={call} alt="asdfs" />
                    <p>{about.mobile1}</p>
                  </div>

                  <div className=" px-2 py-2 flex h-14 ">
                    <img className="px-5" src={call} alt="asdfs" />
                    <p>{about.mobile2}</p>
                  </div>

                  <div className=" px-2 py-2 flex h-14 ">
                    <img className="px-5" src={email} alt="asdfs" />
                    <p>{about.email}</p>
                  </div>

                  <div className=" px-2 py-2 flex h-14 ">
                    <img className="px-5" src={instagram} alt="asdfs" />
                    <p>{about.instagram}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
   </Fragment>
    
  );
};

export default About;
