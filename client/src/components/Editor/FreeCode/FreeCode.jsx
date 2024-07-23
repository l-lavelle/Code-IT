import "../Landing.css";
import '../../../Variables.css';
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "../CodeEditorWindow";
import axios from "axios";
import { classnames } from "../../../utils/general";
import { languageOptions } from "../../../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../../../lib/defineTheme";
import OutputWindow from "../OutputWindow";
import OutputDetails from "../OutputDetails";
import ThemeDropdown from "../ThemeDropdown";
import LanguagesDropdown from "../LanguagesDropdown";
import SaveModal from "./SaveModal";
import {Row, Col} from 'react-bootstrap';
import AuthService from '../../../utils/auth';
import {showErrorToast,showSuccessToast} from '../../../utils/general';

const FreeCode = () => {
  const [code, setCode] = useState();
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const checkStatus = async (token) => {
      const options = {
        method: "GET",
        url: process.env.REACT_APP_RAPID_API_URL +"/" + token,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        },
      };
      try {
        let response = await axios.request(options);
        let statusId = response.data.status?.id;

        // Processed - we have a result
        if (statusId === 1 || statusId === 2) {
          // still processing
          setTimeout(() => {
            checkStatus(token);
          }, 2000);
          return;
        } else {
          setProcessing(false);
          setOutputDetails(response.data);
          showSuccessToast(`Compiled Successfully!`);
          return;
        }
      } catch (err) {
        setProcessing(false);
        showErrorToast();
      }
    };

  function handleThemeChange(th) {
    const theme = th;
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);
 
 
  return (
    <div className="m-2">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="landing-question mb-4">
        <h3 className="mt-3 landing-title">Code Editor</h3>
      </div>
      <div className="theme-info-container">
        <div className="theme-dd">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        <div>
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        {AuthService.loggedIn()?(<SaveModal language={language} code={code}/>):null}
      </div>
      <div className="editor-output">
        <Row>
            <Col xs={12} lg={8} className="mt-2">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
            </Col>
            <Col xs={12} lg={4}>
            <div >
              <OutputWindow outputDetails={outputDetails} />
              <div>
              <button
                onClick={handleCompile}
                disabled={!code}
                className={classnames(
                  "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                  !code ? "opacity-50" : ""
                )}
              >
              {processing ? "Processing..." : "Compile and Execute"}
              </button>
              </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </div>
            </Col>
        </Row>
      </div>
    </div>
  );
};
export default FreeCode;