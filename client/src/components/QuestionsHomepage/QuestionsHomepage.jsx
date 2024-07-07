import React from "react";
import '../../Variables.css'
import './QuestionsHomepage.css'
import QHDropdown from './QHDropdown';
import Check from "../../assets/check.svg";
import { useEffect, useState } from 'react';
import {InputGroup, Form, DropdownButton, Dropdown} from 'react-bootstrap';
// If logged in need to figure out if correct or not

const QuestionsHomepage = () => {
  const [questions, setQuestions] = useState();
  const[difficultyId, setDifficultyId]=useState("1");
  const[languageInfo,setLanguageInfo]=useState({"languageType":"Java", "languageId":"1"});
  const [languages, setLanguages] = useState();
  const [difficulty, setDifficulty] = useState();

  useEffect(() => {
    let url2
    let domain = window.location.origin;
    var url = new URL(domain);
    url.port = '3001';  
    url2 = `${url}question/${languageInfo.languageId}/${difficultyId}`;
    if (process.env.NODE_ENV === "production") {
        url2 = `${domain}/question/1/2`;
    }
    fetch(url2, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
      });
  }, [difficultyId, languageInfo.languageId]);

  useEffect(() => {
    let url2
    let domain = window.location.origin;
    var url = new URL(domain);
    url.port = '3001';  
    url2 = `${url}question/languages`;
    if (process.env.NODE_ENV === "production") {
        url2 = `${domain}/question/languages`;
    }
    fetch(url2, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLanguages(data)
      });
  }, []);

  useEffect(() => {
    let url2
    let domain = window.location.origin;
    var url = new URL(domain);
    url.port = '3001';  
    url2 = `${url}question/difficulty`;
    if (process.env.NODE_ENV === "production") {
        url2 = `${domain}/question/difficulty`;
    }
    fetch(url2, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDifficulty(data) 
      });
  }, []);


    if (languages===undefined || difficulty=== undefined || questions === undefined) {
      return <>Still loading...</>;
    }

  return (
    <div className="qh-body">
    <h2 className="pt-3">Coding Challenges</h2>
    <div className=" ms-3 me-3 ">
    <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title="Language"
          id="input-group-dropdown-1"
           className="highlight-lang"
        >
          {
        languages.map((language) => (
          <>
              <Dropdown.Item 
                className={language.language_type===languageInfo.languageType?"highlight-lang":null}
                onClick={()=>setLanguageInfo({languageId:language.id, languageType:language.language_type})}>
                {language.language_type}
                </Dropdown.Item>
              <Dropdown.Divider />
          </>
          ))
        }
        </DropdownButton>
        <Form.Control 
        readOnly
        aria-label="Text input with dropdown button" 
        value={languageInfo.languageType}
        />
      </InputGroup>
    </div>

    <div className=" ms-3 me-3 qh-difficulty-dd">
       <QHDropdown />
    </div>


    <div className="d-flex ms-3 flex-nowrap qh-btnGroup">
    {
      difficulty.map((diff) => (
      <button key={diff.id} className={parseInt(difficultyId)===diff.id ? "newidea button-ct": "button-ct"}
      variant="primary" type="submit" name="Beginner" onClick={()=>setDifficultyId(diff.id)}>
         {diff.difficulty_type}
      </button>
        ))
      }
     {/* <button className="button-ct" variant="primary" type="submit" name="Beginner">
         Beginner
     </button>
     <button className="button-ct" variant="primary" type="submit" name="Intermediate">
          Intermediate
      </button>
      <button className="button-ct" variant="primary" type="submit" name="Advanced">
           Advanced
      </button>
     <button className="button-ct" variant="primary" type="submit" name="Spicy">
         Spicy
     </button> */}
    </div>

    <div className="qh-main-content me-3 ms-3 p-3">
    <ol className="ol-qh-questions ps-3">
      {
        questions.map((question) => (
        <li key={question.id} className="pt-2 pb-2 ps-2 m-2 qh-questions">
          {question.question}
        </li>

        ))
      }
        <li className="pt-2 pb-2 ps-2 m-2 qh-questions">
           havent anserwered question

        </li>
        <li className="pt-2 pb-2 ps-2 m-2  qh-questions-correct">
             correct question
             <img src={Check} className="ps-2" alt="Correct Question Checkmark"></img>
        </li>
        </ol>
    </div>

    </div>
  );
};

export default QuestionsHomepage;