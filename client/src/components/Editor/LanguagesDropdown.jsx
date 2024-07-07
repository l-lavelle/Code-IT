import React from "react";
import Select from "react-select";
import { customStyles } from "../../constants/customStyles";
import { languageOptions } from "../../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <div className="drop-styles">
      <p className="me-3 mt-2">Will be hardcoded depending on question:</p>
      <Select
        placeholder={`Filter By Category`}
        options={languageOptions}
        styles={customStyles}
        defaultValue={languageOptions[0]}
        onChange={(selectedOption) => onSelectChange(selectedOption)}
      />
    </div>
  );
};

export default LanguagesDropdown;