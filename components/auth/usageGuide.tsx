import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
} from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const UsageGuide = ({ learnMore, guide }: any) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        {guide ? (
          <Button
            variant="light"
            endContent={<FontAwesomeIcon icon={faAngleDown} />}
          >
            LMS Usage Guide
          </Button>
        ) : (
          <Button className="bg-light-blue text-dark-blue font-semibold">
            Learn More
          </Button>
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownSection title="Check Module" showDivider>
          {learnMore.map((item: any, index: number) => (
            <DropdownItem
              key={index}
              startContent={<FontAwesomeIcon icon={item.icon} />}
            >
              {item.title}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection title="Need Help?">
          <DropdownItem
            startContent={<FontAwesomeIcon icon={faEnvelope} />}
            href="mailto:lms@email.unikom.ac.id"
          >
            lms@email.unikom.ac.id
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UsageGuide;
