import "./Landing.css";
import '../../Variables.css';
import OutputWindow from "./OutputWindow";
import ThemeDropdown from "./ThemeDropdown";
import {Row, Col} from 'react-bootstrap';
import Loading from '../Loading/Loading'

const EditorLoader = () => {
  return (
    <div className="m-2">
      <div className="landing-question mb-4">
        <div >
        <h3 className="mt-3 me-3 landing-title"><Loading/></h3>
        </div>
        <p></p>
      </div>
      <div className="theme-info-container">
        <div className="theme-dd">
          <ThemeDropdown />
        </div>
      </div>
      <div className="editor-output">
        <Row>
            <Col xs={12} lg={8}>
            <div className="loading-editor"></div>
            </Col>
            <Col xs={12} lg={4}>
            <div >
              <OutputWindow />
            </div>
            </Col>
        </Row>
      </div>
    </div>
  );
};
export default EditorLoader;