import { useState } from 'react';
import {Modal, Form} from 'react-bootstrap';
import {findURL} from '../../../utils/general';
import AuthService from '../../../utils/auth';

function SaveModal({language, code}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [codeData, setCodeData] = useState({ title: '', description: ''});
  const [message, setMessage]=useState({message:'', status:''});

  const updateCodeData= async (event)=>{
    const { name, value } = event.target;
    setCodeData ({ ...codeData, [name]: value });
  };

  const saveCodeBlock = async (event) => {
    event.preventDefault();
    if (code===''){
      setMessage({message:'Must enter code in editor window', status:'error'});
    } 
    else if (codeData.title ==="" || codeData.description === ""){
      setMessage({message:'Must enter title and description', status:'error'});
    } else {
    try {
      const url2 = findURL("codeBlock");
      let decodedBearer = AuthService.getProfile().username;
      console.log("url", url2)
      const response = await fetch(url2, {
        method: 'POST',
        body: JSON.stringify({ title: codeData.title , description:codeData.description, code:code, language:language.name }),
        headers: { "Content-Type": "application/json",   "Authorization":decodedBearer },
       });
       if (response.ok) {
           const data = await response.json();
           console.log("saved data",data)
	// use to get codeblock_id
// close the modal and load single query page
       }else{
        setMessage({message:'Unable to save code block', status:'error'});
       }
    } catch (error) {
      setMessage({message: 'Unable to save code block', status:'error'});
      console.log(error);
    }
    }
  };

  console.log("l", language);
  console.log("c", code);
  return (
    <>
      <button className="button-ct" variant="primary" type="submit" onClick={handleShow}> Save Code Block</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Code Block</Modal.Title>
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
        {message.status==='error'?<p className='text-center mt-3 sl-error' style={{color:"red"}}>{message.message}</p>:<p className='mt-3 sl-error'>&#8203;</p>}     
        </Modal.Body>
        <Modal.Footer>
          <button className="button-ct" variant="primary" type="submit" onClick={saveCodeBlock}> Save </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SaveModal;