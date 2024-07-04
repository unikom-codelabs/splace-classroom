import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

const FooterSettings = ({ stateStep, steps, loading }: any) => {
  return (
    <div className="flex justify-between w-full sticky z-10 bottom-0 ">
      <Button
        className=" px-5"
        variant={"bordered"}
        startContent={<FontAwesomeIcon icon={faAnglesLeft} />}
        onClick={() => {
          stateStep.setCurrentStep((prev: any) => prev - 1);
        }}
        isDisabled={stateStep.currentStep == 1}
      >
        Back
      </Button>
      <Button
        className="bg-dark-blue text-white px-5"
        endContent={<FontAwesomeIcon icon={faAnglesRight} />}
        onClick={() => {
          stateStep.setCurrentStep((prev: any) => prev + 1);
        }}
        type={stateStep.currentStep === steps.length ? "button" : "submit"}
        isLoading={loading}
      >
        {stateStep.currentStep === steps.length ? "Finish" : "Next"}
      </Button>
    </div>
  );
};

export default FooterSettings;
