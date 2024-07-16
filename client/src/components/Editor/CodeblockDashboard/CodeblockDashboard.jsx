import { useState, useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
import {findURL} from '../../../utils/general';
import AuthService from '../../../utils/auth';
import Editor from "@monaco-editor/react";

function CodeBlockDashboard() {
const [codeData, setCodeData] =useState();

// createCodeblock function- modal opens same code and reroute for editing

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
        console.log("data", data)
        setCodeData (data)
      });
  }, []);

    if (codeData ===undefined) {
        return <>Still loading...</>;
        };

  return (
    <>
    <h1>CodeBlock DashBoard</h1>
    <div>
    <Row className="lo-info-container mx-3">
    {codeData.length>0?
    codeData.map((codeblock)=>(
        <Col md={12} lg={5} xl={4}>
        <h3>{codeblock.title}</h3>
        <p>{codeblock.description}</p> 
        <Editor 
        width={`100%`}
        height="125px"
        // value={ codeblock .code}
        // theme={theme.value}
        />
        </Col>)):null}
        <Col md={12} lg={5} xl={4}>
            {/* <div onClick={createCodeblock}></div> add div */}
        </Col>
        </Row>
    </div>
    </>
  );
}

export default CodeBlockDashboard;
