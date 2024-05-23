import { faBookmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem, Divider } from "@nextui-org/react";
import React from "react";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-regular-svg-icons";

const FilterDiscuss = ({ filter, setFilter, isBookmark }: any) => {
  const handleCategoryChange = (value: string) => {
    setFilter({ ...filter, category: value });
  };

  const handleSortChange = (value: string) => {
    setFilter({ ...filter, sort: value });
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-row w-full gap-2 max-h-[250px]">
        <Input
          startContent={<FontAwesomeIcon icon={faSearch} />}
          placeholder="Search Topic Discussion"
        />
        <button
          className="bg-dark-blue text-white font-medium p-2 rounded-md"
          onClick={() => isBookmark.setIsBookmark(!isBookmark.isBookmark)}
        >
          <FontAwesomeIcon
            icon={isBookmark.isBookmark ? faBookmarkSolid : faBookmark}
            className="px-2"
            size="lg"
          />
        </button>
      </div>
      <Divider />
      <div className="flex flex-row w-full gap-2 max-h-[250px]">
        <Autocomplete
          placeholder="Select Category"
          labelPlacement="outside"
          label="Category"
          defaultSelectedKey={"all"}
          onSelectionChange={(value: any) => handleCategoryChange(value)}
          value={filter.category}
        >
          <AutocompleteItem key="all" value="All">
            All Category
          </AutocompleteItem>
          <AutocompleteItem key={"Algorithm"} value="Algorithm">
            Algorithm
          </AutocompleteItem>
          <AutocompleteItem key={"data"} value="Data Structure">
            Data Structure
          </AutocompleteItem>
          <AutocompleteItem key={2} value="JavaScript">
            JavaScript
          </AutocompleteItem>
          <AutocompleteItem key={3} value="Python">
            Python
          </AutocompleteItem>
        </Autocomplete>
        <Autocomplete
          placeholder="Sort By"
          labelPlacement="outside"
          label="Sort By"
          defaultSelectedKey={"newest"}
          onSelectionChange={(value: any) => handleSortChange(value)}
        >
          <AutocompleteItem key="newest" value="Newest">
            Newest
          </AutocompleteItem>
          <AutocompleteItem key="oldest" value="Oldest">
            Oldest
          </AutocompleteItem>
          <AutocompleteItem key="most-voted" value="Most Voted">
            Most Voted
          </AutocompleteItem>
        </Autocomplete>
      </div>
    </div>
  );
};

export default FilterDiscuss;
