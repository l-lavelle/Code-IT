import React from "react";
import '../../Variables.css'
import './QuestionsHomepage.css'
import {Button, ButtonGroup} from 'react-bootstrap';
import QHDropdown from './QHDropdown';
import Check from "../../assets/check.svg";

const QuestionsHomepage = () => {
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