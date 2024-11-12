import React, { useState } from "react";
import CourseGrid from "../home/tabview/CourseGrid";
import fakeData from "../home/tabview/fakeData.json";
import FilterBar from "./FilterBar";
import SearchBar from "../navbar/SearchBar";
import { Box } from "@mui/material";

const CourseList: React.FC = () => {
  // const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} mb={5}>
        <Box flex={7}>
          <FilterBar flex={7} />
        </Box>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </Box>
      <CourseGrid courses={fakeData.courses} />;
    </>
  );
};

export default CourseList;
