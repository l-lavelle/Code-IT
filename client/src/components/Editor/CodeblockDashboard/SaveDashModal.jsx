import { useState } from 'react';
import {Modal, Form} from 'react-bootstrap';
import {findURL} from '../../../utils/general';
import AuthService from '../../../utils/auth';
import LanguagesDropdown from '../LanguagesDropdown';
import { languageOptions } from "../../../constants/languageOptions";

function SaveDashModal({show, setShow}) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [codeData, setCodeData] = useState({ title: '', description: ''});
  const [message, setMessage]=useState({message:'', status:''});
  const [language, setLanguage] = useState(languageOptions[0]);

  const updateCodeData= async (event)=>{
    const { name, value } = event.target;
    setCodeData ({ ...codeData, [name]: value });
  };

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  const saveCodeBlock = async (event) => {
    event.preventDefault();
    if (codeData.title ==="" || codeData.description === ""){
      setMessage({message:'Must enter title and description', status:'error'});
    } else {
    try {
      const url2 = findURL("codeBlock");
      let decodedBearer = AuthService.getProfile().username;
      console.log("url", url2)
      const response = await fetch(url2, {
        method: 'POST',
        body: JSON.stringify({ title: codeData.title , description:codeData.description, language:language.name }),
        headers: { "Content-Type": "application/json",   "Authorization":decodedBearer },
       });
       if (response.ok) {
           const data = await response.json();
           console.log("saved data",data.id);

	// use to get codeblock_id
// close the modal and load single query page- update only 
       }else{
        setMessage({message:'Unable to save code block', status:'error'});
       }
    } catch (error) {
      setMessage({message: 'Unable to save code block', status:'error'});
      console.log(error);
    }
    }
  };

  return (
    <>
      {/* <button className="button-ct" variant="primary" type="submit" onClick={handleShow}> Save Code Block</button> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New CodeBlock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3 text-left">
          <Form.Label>Title</Form.Label>
          <Form.Control 
          type="text" 
          name="title"
          value={ codeData.title}
          onChange={ updateCodeData }
          className={message.status==='error'?"input-error":null}
          />
        </Form.Group>

        <Form.Group className="mb-3 text-left">
          <Form.Label>Description</Form.Label>
          <Form.Control 
          type="text" 
          rows={6}
          as="textarea"
          name="description"
          value={ codeData.description}
          onChange={ updateCodeData }
          className={message.status==='error'?"input-error":null}
          />
        </Form.Group> 
        <LanguagesDropdown onSelectChange={onSelectChange}/>
        {message.status==='error'?<p className='text-center mt-3 sl-error' style={{color:"red"}}>{message.message}</p>:<p className='mt-3 sl-error'>&#8203;</p>}     
        </Modal.Body>
        <Modal.Footer>
          <button className="button-ct" variant="primary" type="submit" onClick={saveCodeBlock}> Create </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SaveDashModal;