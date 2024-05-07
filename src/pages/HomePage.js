import React, { useState, useMemo } from "react";
import { FaRegFile } from "react-icons/fa";
import { TfiSave } from "react-icons/tfi";
import { BsPrinter } from "react-icons/bs";
import Input from "../components/form/Input";
import Label from "../components/form/Label";
import FormHeader from "../components/form/FormHeader";
import ErrorText from "../components/form/ErrorText";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Cell from "../components/ui/Cell";
import Theader from "../components/table/Theader";
import Tdata from "../components/table/Tdata";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const scores = [6, 5, 5, 5, 3, 4, 6];
const labels = [100, 200, 300, 400, 500, 600, 700];
const options = {
  fill: true,
  animations: false,
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

const HomePage = () => {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Mis datos",
          tension: 0.3,
          data: scores,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(16,156,241)",
        },
      ],
      labels,
    };
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const currentdate = new Date();
  const maxdate = new Date(currentdate.setDate(currentdate.getDate() + 6));
  registerLocale("ru", ru);
  let content = (
    <>
      <section>
        <Bar className=" p-5" data={data} options={options} />
      </section>

      <section>
        <FormHeader />
        <div className="p-2 px-3 bg-white flex overflow-x-auto">
          <div className="mr-5 px-3 border-2 flex items-center border-colorBlue text-lg font-normal font-poppins bg-white text-center rounded-lg shadow-lg">
            <FaRegFile className="mr-2" />
            Taze
          </div>
          <div className="mr-5 px-3 border-2 flex items-center border-colorBlue text-lg font-normal font-poppins bg-white text-center rounded-lg shadow-lg">
            <TfiSave className="mr-2" />
            Yatda saklamak
          </div>
          <div className="mr-5 px-3 border-2 flex items-center border-colorBlue text-lg font-normal font-poppins bg-white text-center rounded-lg shadow-lg">
            <BsPrinter className="mr-2" />
            Yazdyr
          </div>
        </div>
        <hr
          className="border-[1px] border-colorBorde
        r"
        />
        <div className="p-5 flex flex-wrap overflow-scroll justify-between">
          <div className="pr-3">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select an option
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="45">Choose a country</option>
              <option value="US">United Statesasdasdas</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="pr-3">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select an option
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="45">Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="pr-3">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select an option
            </label>

            <div>
              <div>
                <DatePicker
                  showYearDropdown
                  scrollableMonthYearDropdown
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  minDate={new Date()}
                  maxDate={maxdate}
                  timeFormat="HH:mm"
                  dateFormat="dd/MM/yyyy hh:mm"
                  timeIntervals={15}
                  locale="ru"
                />
              </div>
            </div>
          </div>
          <div className="pr-3">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-colorTextDarkBlue"
            >
              Select an option
            </label>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                type="checkbox"
                value=""
                id="checkboxDefault"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="font-medium">
                      <tr>
                        <Theader data="№" />

                        <Theader data="First" />

                        <Theader data="Last" />

                        <Theader data="Handle" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr className=" bg-white">
                        <Tdata data="1" />

                        <Tdata data="Mark" />

                        <Tdata data="Otto" />

                        <Tdata data="@mdo" />
                      </tr>
                      <tr className=" bg-colorIconGray">
                        <Tdata data="1" />

                        <Tdata data="Mark" />

                        <Tdata data="Otto" />

                        <Tdata data="@mdo" />
                      </tr>
                      <tr className=" bg-white">
                        <Tdata data="1" />
                        
                        <Tdata data="Mark" />
                        
                        <Tdata data="Otto" />
                       
                        <Tdata data="@mdo" />
                      </tr>
                      <tr className=" bg-colorIconGray">
                        <Tdata data="1" />

                        <Tdata data="Mark" />

                        <Tdata data="Otto" />

                        <Tdata data="@mdo" />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block overflow-x-auto min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="font-medium">
                      <tr>
                        <Theader data="sdfd" />
                        <Theader data="sdfd" />
                        <Theader data="sdfd" />
                        <Theader data="sdfd" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr className=" bg-white">
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                      </tr>
                      <tr className=" bg-colorIconGray">
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                      </tr>
                      <tr className=" bg-white">
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                      </tr>
                      <tr className=" bg-colorIconGray">
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                        <Tdata data="sdfsd" />
                      </tr>
                    </tbody>
                  </table>
                  <nav aria-label="Page navigation">
                    <ul className="inline-flex">
                      <li>
                        <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100">
                          Prev
                        </button>
                      </li>
                      <li>
                        <button className="h-10 px-5 text-white transition-colors duration-150 bg-indigo-600 focus:shadow-outline">
                          1
                        </button>
                      </li>
                      <li>
                        <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100">
                          2
                        </button>
                      </li>
                      <li>
                        <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100">
                          3
                        </button>
                      </li>
                      <li>
                        <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-indigo-100">
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className=" w-full p-3">
          <div className="flex flex-wrap justify-between px-5 items-center space-x-5 text-colorTextDarkBlue">
            <div>
              <p className=" font-bold">23 December, Sunday</p>
            </div>
            <div>Action</div>
            <div>Action</div>
          </div>

          {/* <div class="group relative m-12 flex justify-center">
            <button class="rounded bg-amber-500 px-4 py-2 text-sm text-white shadow-sm">
              Hover me!
            </button>
            <span class="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
              ✨ You hover me!
            </span>
          </div> */}

          <div className="overflow-auto p-3 bg-colorBgContainer">
            <div className="flex w-full p-3 py-5">
              <div className="mx-auto pr-3 flex">
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
              </div>
              <div className="mx-auto pr-3 flex">
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
              </div>
              <div className="mx-auto pr-3 flex">
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
              </div>
              <div className="mx-auto pr-3 flex">
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
              </div>
            </div>

            <div className="flex w-full p-3">
              <div className=" mx-auto pr-3 flex">
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
              </div>
              <div className=" mx-auto pr-3 flex">
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
              </div>
              <div className=" mx-auto pr-3 flex">
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
              </div>
              <div className=" mx-auto pr-3 flex">
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas"
                />
              </div>
            </div>

            <div className="flex w-full p-3">
              <div className=" mx-auto pr-3 flex">
                <Cell bgcolor="bg-colorYellow" tooltip_title="Salam" />
                <div className="group relative rounded-full w-10 h-10 bg-colorRed">
                  <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                    ✨ You hover me!
                  </span>
                </div>
                <div className="group relative rounded-full w-10 h-10 bg-colorYellow">
                  <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                    ✨ You hover me!
                  </span>
                </div>
              </div>
              <div className=" mx-auto pr-3 flex">
                <div className="group relative rounded-full w-10 h-10 bg-white">
                  <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                    ✨ You hover me!
                  </span>
                </div>
                <div className="group relative rounded-full w-10 h-10 bg-colorRed">
                  <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                    ✨ You hover me!
                  </span>
                </div>
                <div className="group relative rounded-full w-10 h-10 bg-colorYellow">
                  <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                    ✨ You hover me!
                  </span>
                </div>
              </div>
              <div className=" mx-auto pr-3 flex">
                <div className="group relative rounded-full w-10 h-10 bg-white">
                  <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                    ✨ You hover me!
                  </span>
                </div>
                <div className="group relative rounded-full w-10 h-10 bg-colorRed">
                  <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                    ✨ You hover me!
                  </span>
                </div>
                <div className="group relative rounded-full w-10 h-10 bg-colorYellow">
                  <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                    ✨ You hover me!
                  </span>
                </div>
              </div>
              <div className=" mx-auto pr-3 flex">
                <div className="group relative rounded-full w-10 h-10 bg-white">
                  <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                    ✨ You hover me!
                  </span>
                </div>
                <div className="group relative rounded-full w-10 h-10 bg-colorRed">
                  <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                    ✨ You hover me!
                  </span>
                </div>
                <Cell
                  bgcolor="bg-colorYellow"
                  tooltip_title="Salam asdf asdasd asdasdasdas asdasdasda"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className=" w-full p-3">
          <div className="flex justify-between px-5 items-center space-x-5 text-colorTextDarkBlue">
            <div>
              <p>8 task completed out of 10</p>
              <p className=" font-bold">23 December, Sunday</p>
            </div>
            <div>Action</div>
            <div>Action</div>
          </div>

          <div className="flex flex-wrap justify-center">
            <div className=" w-[150px] h-[180px] border rounded-lg justify-between flex flex-col m-3">
              <div className="text-center text-lg">
                <p className="text-black font-poppins font-bold">№14</p>
                <p className="text-black">Jemi: 65</p>
                <p className="text-black">Bosy: 54</p>
              </div>
              <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                <div className=" bg-colorGreen  flex bottom-0 h-3 w-[66%] rounded-r "></div>
              </div>
            </div>

            <div className=" w-[150px] h-[180px] border rounded-lg justify-between flex flex-col m-3">
              <div className="text-center text-lg">
                <p className="text-black font-poppins font-bold">№14</p>
                <p className="text-black">Jemi: 65</p>
                <p className="text-black">Bosy: 54</p>
              </div>
              <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                <div className=" bg-colorGreen  flex bottom-0 h-3 w-[66%] rounded-r "></div>
              </div>
            </div>

            <div className=" w-[150px] h-[180px] border rounded-lg justify-between flex flex-col m-3">
              <div className="text-center text-lg">
                <p className="text-black font-poppins font-bold">№14</p>
                <p className="text-black">Jemi: 65</p>
                <p className="text-black">Bosy: 54</p>
              </div>
              <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                <div className=" bg-colorGreen  flex bottom-0 h-3 w-[66%] rounded-r "></div>
              </div>
            </div>

            <div className=" w-[150px] h-[180px] border rounded-lg justify-between flex flex-col m-3">
              <div className="text-center text-lg">
                <p className="text-black font-poppins font-bold">№14</p>
                <p className="text-black">Jemi: 65</p>
                <p className="text-black">Bosy: 54</p>
              </div>
              <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                <div className=" bg-colorGreen  flex bottom-0 h-3 w-[66%] rounded-r "></div>
              </div>
            </div>

            <div className=" w-[150px] h-[180px] border rounded-lg justify-between flex flex-col m-3">
              <div className="text-center text-lg">
                <p className="text-black font-poppins font-bold">№14</p>
                <p className="text-black">Jemi: 65</p>
                <p className="text-black">Bosy: 54</p>
              </div>
              <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                <div className=" bg-colorGreen  flex bottom-0 h-3 w-[66%] rounded-r "></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <FormHeader name="Form" />

        <div className="p-2 px-3 bg-white flex overflow-x-auto">
          <div className="mr-5 px-3 border-2 flex items-center border-colorBlue text-lg font-normal font-poppins bg-white text-center rounded-lg shadow-lg">
            <FaRegFile className="mr-2" />
            Taze
          </div>
          <div className="mr-5 px-3 border-2 flex items-center border-colorBlue text-lg font-normal font-poppins bg-white text-center rounded-lg shadow-lg">
            <TfiSave className="mr-2" />
            Yatda saklamakh
          </div>
          <div className="mr-5 px-3 border-2 flex items-center border-colorBlue text-lg font-normal font-poppins bg-white text-center rounded-lg shadow-lg">
            <BsPrinter className="mr-2" />
            Yazdyr
          </div>
        </div>
        <hr className="border-[1px] border-colorBorder" />

        <form className="bg-white m-auto mt-6 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex desktop:flex-row flex-col">
            <div className="w-full">
              <div className="mb-4">
                <Label placeholder="Satyjy kody: " htmlFor="satyjy" />
                <Input placeholder="Satyjy" type="text" htmlFor="satyjy" />
              </div>
              <div className="mb-6">
                <Label placeholder="Satyjy Ady: " htmlFor="ady" />
                <Input placeholder="Satyjy Ady" type="text" htmlFor="ady" />
              </div>
              <div className="mb-6">
                <select
                  name="status"
                  id="status"
                  className="w-44 text-base text-colorTextDarkBlue py-3 px-4 border-gray-600 shadow-md rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="active">active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-6">
                <Label placeholder="Telefon belgi: " htmlFor="telefon" />
                <Input
                  placeholder="Telefon belgi"
                  type="text"
                  htmlFor="telefon"
                />
              </div>
            </div>

            <div className="flex-grow p-5 mx-auto">
              <div className="pb-5">
                <Label placeholder="Satyjy Suraty: " htmlFor="picture" />
                <Input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  htmlFor="picture"
                />
              </div>
              <div className="border text-center w-32 h-32 rounded-lg mx-auto ">
                Surat
              </div>
            </div>
          </div>

          <div className="flex-col space-y-3">
            <ErrorText message="Please choose a password." />
            <button
              className="bg-white border flex items-center border-colorBlue shadow text-colorTextDarkBlue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              <TfiSave className="mr-3" />
              Sign In
            </button>
          </div>
        </form>
      </section>
    </>
  );
  return content;
};

export default HomePage;
