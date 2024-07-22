// TODO: Do we want response codes 
// If correct do we want to show on the page as well?
import "./Landing.css";
import '../../Variables.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { classnames } from "../../utils/general";
import { languageOptions } from "../../constants/languageOptions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from '../../utils/auth';
import { defineTheme } from "../../lib/defineTheme";
import CodeEditorWindow from "./CodeEditorWindow";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import OffCanvas from "./OffCanvas";
import {Row, Col} from 'react-bootstrap';
import {findURL,showErrorToast,showSuccessToast} from '../../utils/general';


const Landing = () => {
  const [code, setCode] = useState();
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState();
  const [questionData, setQuestionData]=useState();
  const [answerCorrect, setAnswerCorrect] = useState()
 
  useEffect(() => {
    if(AuthService.getToken()!=null){
      let questionId= window.location.pathname.split('/')[2]
      let url2 = findURL(`question/log/${questionId}`);
      let decodedBearer = AuthService.getProfile().username;
      fetch(url2, {
        method: 'GET',
        headers: { "Content-Type": "application/json" ,"Authorization":decodedBearer},
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data",data)
          setQuestionData(data.questionData);
          var index = languageOptions.map(function (lang) { return lang.name; }).indexOf(data.questionData?.language?.language_type);
          setLanguage(languageOptions[index]);
          if (data.userAnswerData.length>0){
            setCode(data.userAnswerData[0].user_work)
          } else {
            setCode(data.questionData.comment)
          }
        })} else {
        let questionId= window.location.pathname.split('/')[2]
        let url2 = findURL(`question/reg/${questionId}`);
        fetch(url2, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setQuestionData(data);
            setCode(data.comment)
            var index = languageOptions.map(function (lang) { return lang.name; }).indexOf(data?.language?.language_type);
            setLanguage(languageOptions[index]);
          })
        }
  }, []);

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

  const checkAnswer = async (data) => {
    let trialAnswer = (atob(data.stdout)).trim()
    if (trialAnswer===questionData.answer){
      setAnswerCorrect("Correct Answer");
      updateUserAnswer(1)
    }else{
      setAnswerCorrect("Incorrect Answer. Try Again");
      updateUserAnswer(0)
    }
  };

  const updateUserAnswer = async (status) => {
    if(AuthService.getToken()!=null){
      let questionId= window.location.pathname.split('/')[2]
      let url2 = findURL(`question/log/${questionId}`);
      let decodedBearer = AuthService.getProfile().username;
      const response = await fetch(url2, {
        method: 'PUT',
        body: JSON.stringify({ solved:status , user_work:code}),
        headers: { "Content-Type": "application/json","Authorization":decodedBearer },
       });
   }
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
          checkAnswer(response.data);
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
console.log("wejkl", questionData)
  if (questionData===undefined) {
    return <>Still loading...</>;
  }
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
        <div >
        <h3 className="mt-3 me-3 landing-title">{questionData.name}</h3>
        <OffCanvas 
        solution={questionData.solution}
        hint={questionData.hint}
        theme={theme}
        language={language?.value}
        />
        </div>
        <p >{questionData.question}</p>
      </div>
      <div className="theme-info-container">
        <div className="theme-dd">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        <div className="mt-2 language-dd" >
          <p>Language: {language.name}</p>
        </div>
      </div>
      <div className="editor-output">
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
          {outputDetails && <OutputDetails outputDetails={outputDetails} questionData={questionData}/>}
          {answerCorrect===undefined?null:<p>{answerCorrect}</p>}
            </div>
            </Col>
        </Row>
      </div>
    </div>
  );
};
export default Landing;