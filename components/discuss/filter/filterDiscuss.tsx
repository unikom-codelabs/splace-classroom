import { faBookmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import React, { startTransition } from "react";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-regular-svg-icons";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterDiscuss = ({ isBookmark }: any) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params.get("tags") || "";
  const text = params.get("text") || "";
  const sort_by = params.get("sort_by") || "";

  const checkFilter =
    (category ? true : false) ||
    (text ? true : false) ||
    (sort_by ? true : false);

  const [filter, setFilter] = React.useState({
    tags: category || "all",
    sort: sort_by || "newest",
    text: text || "",
  });

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    setFilter((prev: any) => ({ ...prev, tags: value }));

    if (value !== "all" && value !== null) {
      params.set("tags", value);
    } else {
      params.delete("tags");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  function handleSearch(value: string) {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("text", value);
    } else {
      params.delete("text");
    }

    setFilter((prev: any) => ({ ...prev, text: value }));
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  const handleSortChange = (value: string) => {
    setFilter((prev: any) => ({ ...prev, sort: value }));
    const params = new URLSearchParams(window.location.search);

    if (value !== "newest" && value !== null) {
      params.set("sort_by", value);
    } else {
      params.delete("sort_by");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleResetFilter = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("tags");
    params.delete("sort_by");
    params.delete("text");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-row w-full gap-2 max-h-[250px]">
        <Input
          startContent={<FontAwesomeIcon icon={faSearch} />}
          placeholder="Search Topic Discussion"
          onValueChange={(value) => handleSearch(value)}
          value={filter.text}
        />
        <Tooltip
          content={`
          ${
            isBookmark.isBookmark
              ? "Show All Discussion"
              : "Show Bookmarked Discussion"
          }
        `}
        >
          <button
            className="bg-dark-blue text-white font-medium p-2 rounded-md"
            onClick={() => isBookmark.setIsBookmark(!isBookmark.isBookmark)}
          >
            <FontAwesomeIcon
              icon={isBookmark.isBookmark ? faBookmark : faBookmarkSolid}
              className="px-2"
              size="lg"
            />
          </button>
        </Tooltip>
      </div>
      <Divider />
      <div className="flex flex-row w-full gap-2 max-h-[250px]">
        <Autocomplete
          placeholder="Select Category"
          labelPlacement="outside"
          label="Category"
          defaultSelectedKey={filter.tags}
          onSelectionChange={(value: any) => handleCategoryChange(value)}
          value={filter.tags}
        >
          <AutocompleteItem key={"all"} value="All">
            All Category
          </AutocompleteItem>
          <AutocompleteItem key={"algorithm"} value="Algorithm">
            Algorithm
          </AutocompleteItem>
          <AutocompleteItem key={"data"} value="Data Structure">
            Data Structure
          </AutocompleteItem>
          <AutocompleteItem key={"javascript"} value="JavaScript">
            JavaScript
          </AutocompleteItem>
          <AutocompleteItem key={"python"} value="Python">
            Python
          </AutocompleteItem>
        </Autocomplete>
        <Autocomplete
          placeholder="Sort By"
          labelPlacement="outside"
          label="Sort By"
          defaultSelectedKey={"newest"}
          onSelectionChange={(value: any) => handleSortChange(value)}
          value={filter.sort}
        >
          <AutocompleteItem key="newest" value="newest">
            Newest
          </AutocompleteItem>
          <AutocompleteItem key="oldest" value="oldest">
            Oldest
          </AutocompleteItem>
          <AutocompleteItem key="top_vote" value="top_vote">
            Most Voted
          </AutocompleteItem>
        </Autocomplete>
      </div>
      {checkFilter && (
        <Button
          className="hover:bg-red-500 hover:text-white border-red-500 text-red-500"
          variant="bordered"
          onClick={() => handleResetFilter()}
        >
          {" "}
          Reset Filter{" "}
        </Button>
      )}
    </div>
  );
};

export default FilterDiscuss;
