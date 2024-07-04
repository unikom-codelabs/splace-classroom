import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";

const Tips = () => {
  return (
    <div className="flex flex-col w-full h-[166px] rounded-lg bg-dark-blue !mt-16">
      <div className="bg-white self-center p-3 rounded-full border-4 border-dark-blue relative -mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="42"
          viewBox="0 0 41 42"
          fill="none"
        >
          <path
            d="M22.5328 10.5322H11.5994C11.1553 10.5322 10.7282 10.5493 10.3182 10.6006C5.72275 10.9935 3.4165 13.7097 3.4165 18.7151V25.5485C3.4165 32.3818 6.14984 33.7314 11.5994 33.7314H12.2828C12.6586 33.7314 13.154 33.9876 13.3761 34.2781L15.4261 37.0114C16.3315 38.2243 17.8007 38.2243 18.7061 37.0114L20.7561 34.2781C21.0123 33.9364 21.4223 33.7314 21.8494 33.7314H22.5328C27.5382 33.7314 30.2544 31.4422 30.6473 26.8297C30.6986 26.4197 30.7157 25.9926 30.7157 25.5485V18.7151C30.7157 13.2656 27.9823 10.5322 22.5328 10.5322ZM11.104 24.1989C10.1473 24.1989 9.39567 23.4301 9.39567 22.4906C9.39567 21.551 10.1644 20.7822 11.104 20.7822C12.0436 20.7822 12.8123 21.551 12.8123 22.4906C12.8123 23.4301 12.0436 24.1989 11.104 24.1989ZM17.0661 24.1989C16.1094 24.1989 15.3578 23.4301 15.3578 22.4906C15.3578 21.551 16.1265 20.7822 17.0661 20.7822C18.0057 20.7822 18.7744 21.551 18.7744 22.4906C18.7744 23.4301 18.0228 24.1989 17.0661 24.1989ZM23.0453 24.1989C22.0886 24.1989 21.3369 23.4301 21.3369 22.4906C21.3369 21.551 22.1057 20.7822 23.0453 20.7822C23.9848 20.7822 24.7536 21.551 24.7536 22.4906C24.7536 23.4301 23.9848 24.1989 23.0453 24.1989Z"
            className="fill-dark-blue"
          />
          <path
            d="M37.5489 11.8818V18.7151C37.5489 22.1318 36.4898 24.4551 34.3714 25.7364C33.8589 26.0439 33.261 25.6339 33.261 25.0359L33.2781 18.7151C33.2781 11.8818 29.366 7.96969 22.5327 7.96969L12.1289 7.98677C11.531 7.98677 11.121 7.38885 11.4285 6.87635C12.7098 4.75802 15.0331 3.69885 18.4327 3.69885H29.366C34.8156 3.69885 37.5489 6.43219 37.5489 11.8818Z"
            className="fill-dark-blue"
          />
        </svg>
      </div>
      <div className="text-center text-white text-sm px-8 p-[14px] mt-2">
        Get problem in this app? Chat us!
      </div>
      <Button
        variant="bordered"
        className="border-white border-1 text-white w-fit mx-auto px-16"
      >
        Chat Now
      </Button>
    </div>
  );
};

export default Tips;
