import './CodeblockDashboard.css';
import '../../../Variables.css';
import { useState, useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
import {findURL} from '../../../utils/general';
import AuthService from '../../../utils/auth';
import Editor from "@monaco-editor/react";
import SaveDashModal from './SaveDashModal';
import Plus from '../../../assets/plus.png';

function CodeBlockDashboard() {
    const [codeData, setCodeData] =useState();
    const [show, setShow] = useState(false);

    const createCodeblock = async () => {
        setShow(true)
    };

  const updateCodeBlock = async (id) => {
    window.location.assign(`/updateCode/${id}`);
  };

  const deleteCodeBlock = async (id)=>{
    let url2 = findURL(`codeBlock/${id}`);
    let decodedBearer = AuthService.getProfile().username;
    fetch(url2, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json", "Authorization": decodedBearer },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCodeData(data)
      });
}


useEffect(() => {
    let url2 = findURL(`codeBlock`);
    let decodedBearer = AuthService.getProfile().username;
    fetch(url2, {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": decodedBearer },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCodeData (data)
      });
  }, []);

  const truncate = (input) => input.length > 25 ? `${input.substring(0, 25)}...` : input;
  
    if (codeData ===undefined) {
        return <>Still loading...</>;
        };

  return (
    <div className='codeblock-dash'>
    <h1 className='mt-3 cd-title'>CodeBlock DashBoard</h1>
    <div>
    <Row className="lo-info-container mx-3">
    {codeData.length>0?
    codeData.map((codeblock)=>(
        <Col md={12} lg={5} xl={4}>
        <div className='code-editor-block'>
        <Editor 
        width={`100%`}
        height="200px"
        value={codeblock.code}
        theme="vs-dark"
        />
        <div className='overlay-edit-code overlay-codeblock'>
         <h3>{codeblock.title}</h3>
         <p>{truncate(codeblock.description)}</p>
         <div>
          <button className="me-3 cd-btn-edit" variant="primary" type="submit" onClick={()=>updateCodeBlock(codeblock.id)}> Edit</button> 
          <button className="cd-btn-delete" variant="primary" type="submit" onClick={()=>deleteCodeBlock(codeblock.id)}> Delete</button> 
         </div> 
         </div>
         </div>
        </Col>
        )):null}
        
        <Col className='code-editor-block' md={12} lg={5} xl={4}>
            <div className="cd-add" onClick={createCodeblock}></div>
            <div className='overlay-edit-code overlay-link' onClick={createCodeblock}>
              <h2 className='cd-link'>Create New CodeBlock</h2>
              <img src={Plus} className='cd-plus-img'/>
            </div>
       
        </Col>
        <SaveDashModal show={show} setShow={setShow}/>
        </Row>
    </div>
    </div>
  );
}

export default CodeBlockDashboard;
