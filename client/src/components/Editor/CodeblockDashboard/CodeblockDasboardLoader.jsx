import './CodeblockDashboard.css';
import '../../../Variables.css';
import {Row, Col} from 'react-bootstrap';
import Plus from '../../../assets/plus.png';

function CodeBlockDashboardLoader() {
  return (
    <div className='codeblock-dash'>
    <h1 className='mt-3 cd-title'>CodeBlock DashBoard</h1>
    <div>
    <Row className="lo-info-container mx-3">        
        <Col  md={12} lg={5} xl={4}>
            <div className='d-flex flex-column cd-new' >
              <h2 className='cd-link'>Create New CodeBlock</h2>
              <img src={Plus} className='cd-plus-img' alt="plus-icon"/>
            </div>
        </Col>
    </Row>
    </div>
    </div>
  );
}

export default CodeBlockDashboardLoader;