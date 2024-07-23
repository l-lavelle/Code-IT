import React from "react";
import Select from "react-select";
import { languageOptions } from "../../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange }) => {

  return (
    <div className="drop-styles">
      {/* <p className="me-3 mt-2">Language:</p> */}
      <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary25: '#f1b866',
          primary: 'black',
        },
      })}
    />
    </div>
  );
};

export default LanguagesDropdown;