import React from "react";
import '../../Variables.css';
import './QuestionsHomepage.css';
import QHDropdown from './QHDropdown';
import Check from "../../assets/check.svg";
import { useEffect, useState } from 'react';
import {InputGroup, Dropdown} from 'react-bootstrap';
import {findURL} from '../../utils/general';
// If logged in need to figure out if correct or not

const QuestionsHomepage = () => {
  const [questions, setQuestions] = useState();
  const [difficultyInfo,setDifficultyInfo]=useState({"difficultyType":"Beginner", "difficultyId":"1"});
  const[languageInfo,setLanguageInfo]=useState({"languageType":"Java", "languageId":"1"});
  const [languages, setLanguages] = useState();
  const [difficulty, setDifficulty] = useState();

  useEffect(() => {
    let url2 = findURL(`question/${languageInfo.languageId}/${difficultyInfo.difficultyId}`)
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
  }, [difficultyInfo.difficultyId, languageInfo.languageId]);

  useEffect(() => {
    let url2 = findURL(`question/languages`)
    console.log("languages", url2)
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
    let url2 = findURL(`question/difficulty`)
    console.log("difficulty", url2)
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
    };

  return (
    <div className="qh-body">
    <h2 className="pt-3">Coding Challenges</h2>
    <p className="m-2 qh-summary">Ready to test your skills? Choose the lanuage you want to use and the difficulty level for the challenge questions. Click on the question in order to start the challenge.</p>
    <div className=" ms-3 me-3 ">
    <InputGroup className="mb-3">
       <QHDropdown 
       title={"Language"}
       value={languageInfo.languageType}
       input= {
        languages.map((language) => (
          <div key={language.languageType}>
              <Dropdown.Item 
                className={language.language_type===languageInfo.languageType?"highlight-lang":null}
                onClick={()=>setLanguageInfo({languageId:language.id, languageType:language.language_type})}>
                {language.language_type}
                </Dropdown.Item>
              <Dropdown.Divider />
          </div>
          ))
        }
        />
    </InputGroup>
    </div>

    <div className=" ms-3 me-3 qh-difficulty-dd">
      <InputGroup className="mb-3">
       <QHDropdown 
       title={"Difficulty"}
       value={difficultyInfo.difficultyType}
       input={
        difficulty.map((diff) => (
          <div key={diff.difficultyType}>
              <Dropdown.Item 
                className={parseInt(difficultyInfo.difficultyId)===diff.id?"highlight-lang":null}
                onClick={()=>setDifficultyInfo({difficultyId:diff.id, difficultyType:diff.difficulty_type})}>
                {diff.difficulty_type}
                </Dropdown.Item>
              <Dropdown.Divider />
          </div>
          ))
        } 
        />  
        </InputGroup>
    </div>


    <div className="d-flex ms-3 flex-nowrap qh-btnGroup">
    {
      difficulty.map((diff) => (
      <button key={diff.id} className={parseInt(difficultyInfo.difficultyId)===diff.id ? "highlight-diff-default button-ct": "button-ct"}
      variant="primary" type="submit" name="Beginner" onClick={()=>setDifficultyInfo({"difficultyType":diff.difficulty_type, "difficultyId":diff.id})}>
         {diff.difficulty_type}
      </button>
        ))
      }
    </div>

    <div className="qh-main-content me-3 ms-3 p-3 mb-3">
      <ol className="ol-qh-questions ps-3">
        {
          questions.map((question) => (
          <li key={question.id} className="pt-2 pb-2 ps-2 m-2 qh-questions"
          onClick={()=>window.location.assign(`/challenge/${question.id}`)}>
            {question.question}
          </li>
          ))
        }
          {/* <li className="pt-2 pb-2 ps-2 m-2 qh-questions">
            havent anserwered question

          </li>
          <li className="pt-2 pb-2 ps-2 m-2  qh-questions-correct">
              correct question
              <img src={Check} className="ps-2" alt="Correct Question Checkmark"></img>
          </li> */}
      </ol>
    </div>
    </div>
  );
};

export default QuestionsHomepage;