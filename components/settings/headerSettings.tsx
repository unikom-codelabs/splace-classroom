import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../../styles/stepper.css";

const HeaderSettings = ({ stateStep, steps }: any) => {
  return (
    <>
      {/* <h2 className="text-2xl font-bold mb-2">LMS Management</h2>
      <p className="">Manage your LMS Here</p> */}
      <div className="flex justify-center gap-[23rem]">
        {steps?.map((step: any, i: any) => (
          <div
            key={i}
            className={`step-item ${
              stateStep.currentStep === i + 1 && "active"
            } ${i + 1 < stateStep.currentStep && "complete"} `}
          >
            <div className="step text-white">
              {i + 1 < stateStep.currentStep ? (
                <FontAwesomeIcon icon={faCheck} color="white" />
              ) : (
                i + 1
              )}
            </div>
            <p className="text-gray-500 font-semibold">{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HeaderSettings;
