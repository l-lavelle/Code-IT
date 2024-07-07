import React from "react";
import '../../Variables.css'
import './QuestionsHomepage.css'
import {Button, ButtonGroup} from 'react-bootstrap';
import QHDropdown from './QHDropdown';
import Check from "../../assets/check.svg";
import { useEffect, useState } from 'react';
// Data loads in- need default beginner and lanugage choosen
// If logged in need to figure out if correct or not

const QuestionsHomepage = () => {
  const [questions, setQuestions] = useState();
  const[defaults,setDefaults]=useState({"questionId":"1", "languageId":"1"})
 
  useEffect(() => {
    let url2
    let domain = window.location.origin;
    var url = new URL(domain);
    url.port = '3001';  
    url2 = `${url}question/${defaults.languageId}/${defaults.questionId}`;
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
  }, []);

  // Get all langugaes
  // Get all difficulties

  // Not loading with timing correctly
  // useEffect(() => {
  //   async function fetchData() {
  //     let url2
  //     let domain = window.location.origin;
  //     var url = new URL(domain);
  //     url.port = '3001';  
  //     url2 = `${url}question/1/2`;
  //     if (process.env.NODE_ENV === "production") {
  //        url2 = `${domain}/question/1/2`;
  //     }
      
  //      const response =await fetch(url2, {
  //       method: 'GET',
  //       headers: { "Content-Type": "application/json" },
  //      })
  //       const data = await response.json();
  //       // console.log("data",data)
  //       setQuestions(data)
  //       console.log("trial",questions)
  //       return data
  //   }
  //   setTimeout(fetchData, 3000)
  //   console.log("in useEffect",questions)
  // }, []);


  // useEffect(() => {
  //   const trialsd = handleSignup();
  //   console.log("useEffet",trialsd)
  //   return trialsd
    // console.log(questions)


    // (async () => {
    //   let url2
    //   let domain = window.location.origin;
    //   var url = new URL(domain);
    //   url.port = '3001';  
    //   url2 = `${url}question/1/2`;
    //   if (process.env.NODE_ENV === "production") {
    //      url2 = `${domain}/question/1/2`;
    //   }
      
    //    const response =await fetch(url2, {
    //     method: 'GET',
    //     // body: JSON.stringify({ username: loginData.username,password:loginData.password }),
    //     headers: { "Content-Type": "application/json" },
    //    })
    //     const data = await response.json();
    //     console.log("data",data)
    //     setQuestions(data)
    //     console.log("trial",questions)
    //     return data
    // })(); 
  // }, []);


  // const  handleSignup = async (event) =>{
  // let url2
  //     let domain = window.location.origin;
  //     var url = new URL(domain);
  //     url.port = '3001';  
  //     url2 = `${url}question/1/2`;
  //     if (process.env.NODE_ENV === "production") {
  //        url2 = `${domain}/question/1/2`;
  //     }
      
  //      const response =await fetch(url2, {
  //       method: 'GET',
  //       headers: { "Content-Type": "application/json" },
  //      })
  //       const data = await response.json();
  //       // console.log("data",data)
  //       setQuestions(data)
  //       // console.log("trial",questions)
  //       return data
  //     }


      if (questions === undefined) {
        return <>Still loading...</>;
      }

console.log("trails on load", questions)
  return (
    <div className="qh-body">
    <h2 className="pt-3">Coding Challenges</h2>
    <div className=" ms-3 me-3 ">
    <QHDropdown />
    </div>

    <div className=" ms-3 me-3 qh-difficulty-dd">
       <QHDropdown />
    </div>

    <div className="d-flex ms-3 flex-nowrap qh-btnGroup">

     <button className="button-ct" variant="primary" type="submit" name="Beginner">
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
     </button>
    </div>

    <div className="qh-main-content me-3 ms-3 p-3">
    <ol className="ol-qh-questions ps-3">
      {
        questions.map((question) => (
          <>
           <li className="pt-2 pb-2 ps-2 m-2 qh-questions">
          {question.question}
        </li>
        </>
        ))
      }
        <li className="pt-2 pb-2 ps-2 m-2 qh-questions">
           havent anserwered question

        </li>
        <li className="pt-2 pb-2 ps-2 m-2  qh-questions-correct">
             correct question
             <img src={Check} className="ps-2"></img>
        </li>
         <li className="pt-2 pb-2 ps-2 m-2  qh-questions">
             question
        </li>
        </ol>
    </div>

    </div>
  );
};

export default QuestionsHomepage;