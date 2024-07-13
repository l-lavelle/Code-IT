import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import './Landing.css';

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="editor-window">
      <Editor 
        width={`100%`}
        height="70vh"
        language={language || "javascript"}
        value={value}
        theme={theme}
         defaultValue={code}
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;