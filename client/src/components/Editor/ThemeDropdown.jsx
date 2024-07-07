
import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../../constants/customStyles";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  return (
    <div className="drop-styles">
      <p className="me-3 mt-2">Theme:</p>
      <Select
        placeholder={`Select Theme`}
        options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
        }))}
        value={theme}
        styles={customStyles}
        onChange={handleThemeChange}
      />
    </div>
  );
};

export default ThemeDropdown;