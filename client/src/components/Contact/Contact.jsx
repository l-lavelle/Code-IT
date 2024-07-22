import '../../Variables.css';
import './Contact.css';
import Form from 'react-bootstrap/Form';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import  { useState } from 'react';
import {showErrorToast,showSuccessToast} from '../../utils/general';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
    const [emailData, setEmailData] = useState({ message: '', from_name: '', from_email:''});

    const updateData= async (event)=>{
        const { name, value } = event.target;
        setEmailData({ ...emailData, [name]: value });
      };

    const form = useRef();

     const sendEmail = (e) => {
       e.preventDefault();

       emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE, process.env.REACT_APP_EMAILJS_TEMPLATE, form.current, process.env.REACT_APP_EMAILJS_KEY)
         .then((result) => {
            showSuccessToast("Email was sent")
            setEmailData({
                message: '',
                from_name: '',
                from_email:''
              })
         }, (error) => {
            showErrorToast("Unable to send email")
         });
     };

  return (
  <main>
    <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    <div className="contact-container-wrapper">
    <div className="contact-top-container"></div>
    <div className="contact-bottom-container"></div>
    <div className="contact-container p-4">
      <h2 className="mb-3 mt-2">Contact Us</h2>
      <p>We always love to hear from our users! Let us know your thoughts about the site, any suggestions for future features, or any problems you’re having. Contact us using the form below and we will reach out to you at email address provided as soon as possible.</p>
      <Form ref={form} onSubmit={sendEmail}>
        <Form.Group className="mb-3 contact-group" controlId="formBasicEmail">
          <Form.Label >Name</Form.Label>
          <Form.Control type="text"  onChange={updateData} value={emailData.from_name} name="from_name"/>
        </Form.Group>

        <Form.Group className="mb-3 contact-group" controlId="formBasicPassword">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email"  onChange={updateData} value={emailData.from_email} name="from_email"/>
        </Form.Group>

        <Form.Group className="mb-3 contact-group" controlId="exampleForm.ControlTextarea1">
          <Form.Label >Message</Form.Label>
          <Form.Control as="textarea" rows={8}  onChange={updateData} value={emailData.message} name="message"/>
        </Form.Group>

        <button className="button-ct" variant="primary" type="submit">
          Send
        </button>
        </Form>
      </div>
    </div>
  </main>
  );
};

export default Contact;