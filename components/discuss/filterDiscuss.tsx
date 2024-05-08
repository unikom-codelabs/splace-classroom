import { faBookmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import {
  Autocomplete,
  AutocompleteItem,
  DateRangePicker,
  Divider,
} from "@nextui-org/react";
import React from "react";

const FilterDiscuss = () => {
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-row w-full gap-2 max-h-[250px]">
        <Input
          startContent={<FontAwesomeIcon icon={faSearch} />}
          placeholder="Search Topic Discussion"
        />
        <button className="bg-dark-blue text-white font-medium p-2 rounded-md">
          <FontAwesomeIcon icon={faBookmark} className="px-2" size="lg" />
        </button>
      </div>
      <Divider />
      <div className="flex flex-row w-full gap-2 max-h-[250px]">
        <Autocomplete
          placeholder="Select Category"
          labelPlacement="outside"
          label="Category"
        >
          <AutocompleteItem key={0} value="Algorithm">
            Algorithm
          </AutocompleteItem>
          <AutocompleteItem key={1} value="Data Structure">
            Data Structure
          </AutocompleteItem>
          <AutocompleteItem key={2} value="JavaScript">
            JavaScript
          </AutocompleteItem>
          <AutocompleteItem key={3} value="Python">
            Python
          </AutocompleteItem>
        </Autocomplete>
        <DateRangePicker
          label="Time Period"
          labelPlacement="outside"
          className=" justify-between"
        />
      </div>
    </div>
  );
};

export default FilterDiscuss;
