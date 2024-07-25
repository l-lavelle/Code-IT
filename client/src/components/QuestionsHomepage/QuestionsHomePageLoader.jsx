import '../../Variables.css';
import './QuestionsHomepage.css';
import {InputGroup} from 'react-bootstrap';
import QHDropdown from './QHDropdown';
import Loading from '../Loading/Loading'

function QuestionDropdownLoader() {
  return (
    <div className="qh-body">
    <h2 className="pt-3">Coding Challenges</h2>
    <p className="m-2 qh-summary">Ready to test your skills? Choose the lanuage you want to use and the difficulty level for the challenge questions. Click on the question in order to start the challenge.</p>
    <div className=" ms-3 me-3 ">
    <InputGroup className="mb-3 qh-dd">
       <QHDropdown />
    </InputGroup>
    </div>

    <div className=" ms-3 me-3 qh-difficulty-dd">
      <InputGroup className="mb-3 qh-dd">
       <QHDropdown />  
        </InputGroup>
    </div>


    <div className="d-flex ms-3 flex-nowrap qh-btnGroup">
      <button className="button-ct">Easy</button>
      <button className="button-ct">Medium</button>
      <button className="button-ct">Hard</button>
    </div>

    <div className="qh-main-content me-3 ms-3 p-3 mb-3">
      <ol className="ol-qh-questions ps-3">
        <Loading loaderStyle={"loading pt-2 pb-2 ps-2 m-2 qh-questions"}/>
        <Loading loaderStyle={"loading pt-2 pb-2 ps-2 m-2 qh-questions"}/>
        <Loading loaderStyle={"loading pt-2 pb-2 ps-2 m-2 qh-questions"}/>
        <Loading loaderStyle={"loading pt-2 pb-2 ps-2 m-2 qh-questions"}/>
        <Loading loaderStyle={"loading pt-2 pb-2 ps-2 m-2 qh-questions"}/>
      </ol>
    </div>
    </div>
  );
}

export default QuestionDropdownLoader;