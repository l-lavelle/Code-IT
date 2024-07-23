// TODO: Change to match other dropdown??
import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  return (
    <div className="drop-styles">
      {/* <p className="me-3 mt-2">Theme:</p> */}
      
      <Select
        placeholder={`Select Theme`}
        options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
        }))}
        value={theme}
        onChange={handleThemeChange}
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

export default ThemeDropdown;