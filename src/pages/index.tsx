
import Image from "next/image";
import { FormEvent, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function Home() {
  dayjs.extend(customParseFormat);
  const [day, setDay] = useState("DD");
  const [month, setMonth] = useState("MM");
  const [year, setYear] = useState("YYYY");

  const [oldDay, setOldDay] = useState("--");
  const [oldMonth, setOldMonth] = useState("--");
  const [oldYear, setOldYear] = useState("--");

  const [dayInput, setDayInput] = useState(false);
  const [monthInput, setMonthInput] = useState(false);
  const [yearInput, setYearInput] = useState(false);

  const [isCalculate, setIsCalculate] = useState(false);

 const date = day + "/" + month + "/" + year;

  const givenDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );
  const currentDate = new Date();
  const currentYear = new Date().getFullYear();

  function calculateAge(
    day: string,
    month: string,
    year: string,
    event: FormEvent
  ) {
    event.preventDefault();
    setIsCalculate(true);
    const date = day + "/" + month + "/" + year;
    const currentDate = new Date();

    if (dayjs(date, "DD/MM/YYYY", true).isValid()) {
      const _date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      const calculatedMils = Math.abs(currentDate.valueOf() - _date.valueOf());

      const { years, months, days } = calculateYearsMonthsDays(calculatedMils);

      setOldDay(days.toString());
      setOldMonth(months.toString());
      setOldYear(years.toString());
    }
  }

  function calculateYearsMonthsDays(milliseconds: number) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = (days % 365) % 30;

    return {
      years: years,
      months: months,
      days: remainingDays,
    };
  }

  return (
    <main className="flex h-screen flex-col bg-slate-200">
      <form
        onSubmit={(e) => {
          calculateAge(day, month, year, e);
        }}
        className="mx-auto my-auto flex h-[520px] w-[90%] flex-col rounded-t-[35px] rounded-bl-[35px] rounded-br-[130px] bg-white xl:h-[680px]  xl:w-[45%] xl:px-10 xl:py-4"
      >
        {/* Date form inputs */}
        <div className="mx-5 mt-10 grid w-[75%] grid-cols-3 gap-5">
          <div className="relative flex  flex-col">
            <label
              className="mb-1 text-base font-semibold tracking-wider"
              htmlFor=""
            >
              DAY
            </label>
            <input
              onChange={(e) => {
                if (e.target.value.length <= 2) {
                  if (e.target.value.length === 0) {
                    setDayInput(false);
                  } else {
                    setDayInput(true);
                  }
                  setDay((prev: SetStateAction<string>) => {
                    return e.target.value;
                  });
                } else {
                  return;
                }
              }}
              className="h-14 rounded-lg border-[1px] border-cyan-300 px-3  text-2xl font-bold xl:h-20 xl:px-5 xl:text-4xl"
              type="number"
              value={day}
              placeholder="DD"
            />
            {isCalculate && !dayInput ? (
              <p className="absolute bottom-[-45px] text-sm text-error">
                This field is required
              </p>
            ) : isCalculate &&
              day.length > 0 &&
              !dayjs(date, "DD/MM/YYYY", true).isValid() ? (
              <p className="absolute bottom-[-45px] text-sm text-error xl:bottom-[-32px]">
                Must be valid date
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="relative flex  flex-col">
            <label
              className="mb-1 text-base font-semibold tracking-wider"
              htmlFor=""
            >
              MONTH
            </label>
            <input
              onChange={(e) => {
                if (e.target.value.length <= 2) {
                  if (e.target.value.length === 0) {
                    setMonthInput(false);
                  } else {
                    setMonthInput(true);
                  }
                  setMonth((prev: SetStateAction<string>) => {
                    return e.target.value;
                  });
                } else if (e.target.value.length === 0) {
                  setDayInput(false);
                } else {
                  return;
                }
              }}
              className="h-14 rounded-lg border-[1px] border-cyan-300 px-3  text-2xl font-bold xl:h-20 xl:px-5 xl:text-4xl"
              type="number"
              placeholder="MM"
              value={month}
            />
            {isCalculate && !monthInput ? (
              <p className="absolute bottom-[-45px] text-sm text-error">
                This field is required
              </p>
            ) : (isCalculate && month.length > 0 && parseInt(month) > 12) ||
              month.length === 1 ||
              month === "00" ? (
              <p className="absolute bottom-[-45px] text-sm text-error xl:bottom-[-32px]">
                Must be valid date
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="relative flex  flex-col">
            <label
              className="mb-1 text-base font-semibold tracking-wider"
              htmlFor=""
            >
              YEAR
            </label>
            <input
              value={year}
              onChange={(e) => {
                if (e.target.value.length <= 4) {
                  if (e.target.value.length === 0) {
                    setYearInput(false);
                  } else {
                    setYearInput(true);
                  }
                  setYear((prev: SetStateAction<string>) => {
                    return e.target.value;
                  });
                } else if (e.target.value.length === 0) {
                  setDayInput(false);
                } else {
                  return;
                }
              }}
              className="h-14 rounded-lg border-[1px] border-cyan-300 px-3 text-2xl font-bold xl:h-20 xl:px-5 xl:text-4xl"
              type="number"
              placeholder="YYYY"
            />
            {isCalculate && !yearInput ? (
              <p className="absolute bottom-[-45px] text-sm text-error">
                This field is required
              </p>
            ) : isCalculate &&
              year.length > 0 &&
              (givenDate.getTime() > currentDate.getTime() ||
                parseInt(year) < 1000) ? (
              <p className="absolute bottom-[-45px] text-sm text-error xl:bottom-[-32px]">
                Must be valid date
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* Calculator button */}
        <div className="my-12 flex flex-col px-4">
          <hr className="relative top-7 z-10  border-t-2 bg-slate-500" />
          <button className="z-20">
            <Image
              className="relative bottom-5 left-[45%] mx-auto rounded-full bg-primary p-4 xl:h-24 xl:w-24 xl:p-6"
              src={"icon-arrow.svg"}
              height={60}
              width={60}
              alt="Button for calculating age"
            ></Image>
          </button>
        </div>
        {/* Results */}
        <div className="flex flex-col xl:relative xl:bottom-10 gap-2  px-5 text-[56px] italic xl:text-[85px]">
          <div className="flex gap-3  font-bold leading-none">
            <p className="text-primary">{oldYear}</p>
            <p>years</p>
          </div>
          <div className="flex  gap-3  font-bold leading-none">
            <p className="text-primary">{oldMonth}</p>
            <p>months</p>
          </div>
          <div className="gap-3] flex font-bold leading-none">
            <p className="text-primary">{oldDay}</p>
            <p>days</p>
          </div>
        </div>
      </form>
    </main>
  );
}
