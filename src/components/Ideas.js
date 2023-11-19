import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Ideas = () => {
    const lang = localStorage.getItem("userLanguage");
    const { ideas } = useSelector((state) => state?.info?.mainInfo);
    return (
        <>
            {ideas && ideas?.length > 0 ? (
                <div className="container pb-8">
                    <h2 className="text-2xl font-medium text-center text-gray-800 uppercase mb-6">
                        {lang === "tm" ? "Sowgat üçin iň gowy saýlaw" : "Избранные идеи подарков"}
                    </h2>
                    <div className=" flex px-20 justify-center">

                        {ideas.map((idea, key) => (
                            <Link to={"/idea/" + key} key={key}>
                            <div
                                className="[word-wrap: break-word]  my-[5px] mr-4 flex h-[40px] cursor-pointer items-center justify-between rounded-[16px] border border-primary bg-[#eceff1] bg-[transparent] px-[15px] py-0 text-[20px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-[#3b71ca] hover:!shadow-none"
                                data-te-ripple-color="dark">
                                {lang === 'tm' ? idea.title_tm : idea.title_ru}
                            </div>
                            </Link>
                        ))}


                    </div>

                </div>
            ) : (
                " "
            )}
        </>
    );
};

export default Ideas;
