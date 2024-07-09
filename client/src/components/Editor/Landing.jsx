import "./Landing.css"
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../../utils/general";
import { languageOptions } from "../../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../../lib/defineTheme";
// import useKeyPress from "../../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
// import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import OffCanvas from "./OffCanvas";
// import LanguagesDropdown from "./LanguagesDropdown";
import {Row, Col} from 'react-bootstrap';


const Landing = () => {
  const [code, setCode] = useState();
  // const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  // var index = languageOptions.map(function (lang) { return lang.name; }).indexOf(hardcodedLan);
  // const [language, setLanguage] = useState(languageOptions[index]);
  const [language, setLanguage] = useState();
  const [questionData, setQuestionData]=useState();
  const [answerCorrect, setAnswerCorrect] = useState()

  useEffect(() => {
    let url2
    let domain = window.location.origin;
    var url = new URL(domain);
    url.port = '3001';  
    let questionId= window.location.pathname.split('/')[2]
    // Will this change on deployment??
    // console.log("questionId",window.location.pathname.split('/')[2]);
    url2 = `${url}question/${questionId}`;
    if (process.env.NODE_ENV === "production") {
        url2 = `${domain}/question/${questionId}`;
    }
    fetch(url2, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuestionData(data);
        // console.log("trials", data?.language?.language_type)
        var index = languageOptions.map(function (lang) { return lang.name; }).indexOf(data?.language?.language_type);
        setLanguage(languageOptions[index]);
        // console.log("index",languageOptions[index])
        // console.log("index",data?.language?.language_type)
      })
  }, []);

  // console.log("data",questionData)
  // const enterPress = useKeyPress("Enter");
  // const ctrlPress = useKeyPress("Control");

  // const onSelectChange = (sl) => {
  //   console.log("selected Option...", sl);
  //   setLanguage(sl);
  // };


const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      // stdin: btoa(customInput),
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
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
        // checkAnswer();
      })
      // .then(function () {
 
      //   checkAnswer();
      // })
      // .then(checkAnswer())
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

  // Need to figure out how to check answer
  const checkAnswer = async (data) => {
  //  console.log("output details",outputDetails);
  //  console.log("stdout",atob(outputDetails.stdout))
    // this is the problem on first load eveery time new question
    // let trial = (atob(outputDetails.stdout)).trim()
    console.log("check answer",data)
    let trial = (atob(data.stdout)).trim()


  //   if (/\s/.test(atob(outputDetails.stdout))) {
  //     console.log("space")
  // }
    // console.log(typeof atob(outputDetails.stdout))
    // console.log("1",atob(outputDetails.stdout))
    // console.log("2",5===atob(outputDetails.stdout))
    // console.log("3","5"===trial)
    // console.log("4",5===questionData.answer)
    // console.log("5","5"===questionData.answer)
    // console.log(typeof questionData.answer)
    // console.log(typeof atob(outputDetails.stdout) === typeof questionData.answer)
    // console.log("6",trial===questionData.answer)
    if (trial===questionData.answer){
      setAnswerCorrect("Correct Answer")
    }else{
      setAnswerCorrect("Incorrect Answer. Try Again")
    }
  };

//  useEffect(() => {
//     if (enterPress && ctrlPress) {
//       console.log("enterPress", enterPress);
//       console.log("ctrlPress", ctrlPress);
//       handleCompile();
//     }
//   }, [ctrlPress, enterPress]);
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
        console.log("response.data", response.data);
        checkAnswer(response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
     const theme = th;
        console.log("theme...", theme);

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

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  
  if (questionData===undefined) {
    return <>Still loading...</>;
  }
  return (
    <div className="m-2">
    
      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <div className="landing-question mb-4">
      <h3 className="mt-3 landing-title">{questionData.name}</h3>
      <p>{questionData.question}</p>
      </div>
      <div className="theme-info-container">
        <div className="theme-dd">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        <div className="mt-2" >
          <p>Language: {language.name}</p>
          {/* <LanguagesDropdown onSelectChange={onSelectChange} index={language}/> */}
        </div>
        <OffCanvas 
        solution={questionData.solution}
        hint={questionData.hint}
        theme={theme}
        />

      </div>
      <div className="editor-output">
        {/* <Container> */}
          <Row>
            <Col xs={12} lg={8}>
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
            {/* <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            /> */}
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
          {/* see if can put correct vs. incorrect in this file- if working correcly cut and change */}
          {outputDetails && <OutputDetails outputDetails={outputDetails} questionData={questionData}/>}
          {answerCorrect===undefined?null:<p>{answerCorrect}</p>}
        </div>
        </Col>
        </Row>
        {/* </Container> */}
      </div>
    </div>
  );
};
export default Landing;