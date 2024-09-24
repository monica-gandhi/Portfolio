import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: linear-gradient(225deg, hsla(271, 100%, 40%, 1) 0%, hsla(294, 100%, 40%, 1) 100%);
    transform: scale(1.05);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
`;

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validations, setValidations] = useState({
    email: '',
    name: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'from_email':
        setValidations((prev) => ({
          ...prev,
          email: validateEmail(value) ? '' : 'Invalid email format.'
        }));
        break;
      case 'from_name':
        setValidations((prev) => ({
          ...prev,
          name: value ? '' : 'Name is required.'
        }));
        break;
      case 'subject':
        setValidations((prev) => ({
          ...prev,
          subject: value ? '' : 'Subject is required.'
        }));
        break;
      case 'message':
        setValidations((prev) => ({
          ...prev,
          message: value ? '' : 'Message is required.'
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear previous error messages

    const email = form.current.from_email.value;
    const name = form.current.from_name.value;
    const subject = form.current.subject.value;
    const message = form.current.message.value;

    // Validate all fields
    const newValidations = {
      email: validateEmail(email) ? '' : 'Please enter a valid email address.',
      name: name ? '' : 'Name is required.',
      subject: subject ? '' : 'Subject is required.',
      message: message ? '' : 'Message is required.'
    };

    // Update validations state
    setValidations(newValidations);

    // Check for any validation errors
    const hasErrors = Object.values(newValidations).some(error => error);
    if (hasErrors) {
      setLoading(false);
      return;
    }

    // Send email
    emailjs.sendForm('service_9088cer', 'template_6f3f2x1', form.current, 'SgGILu9z63-LUA4b6')
      .then((result) => {
        setOpen(true);
        setValidations({ email: '', name: '', subject: '', message: '' }); // Reset validations
        form.current.reset(); // Reset the form fields
        setLoading(false);
      }, (error) => {
        console.log(error.text);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput 
            placeholder="Your Email" 
            name="from_email" 
            onChange={handleValidation} 
          />
          {validations.email && <ErrorMessage>{validations.email}</ErrorMessage>}
          
          <ContactInput 
            placeholder="Your Name" 
            name="from_name" 
            onChange={handleValidation} 
          />
          {validations.name && <ErrorMessage>{validations.name}</ErrorMessage>}
          
          <ContactInput 
            placeholder="Subject" 
            name="subject" 
            onChange={handleValidation} 
          />
          {validations.subject && <ErrorMessage>{validations.subject}</ErrorMessage>}
          
          <ContactInputMessage 
            placeholder="Message" 
            rows="4" 
            name="message" 
            onChange={handleValidation} 
          />
          {validations.message && <ErrorMessage>{validations.message}</ErrorMessage>}
          
          <ContactButton type="submit" value={loading ? "Sending..." : "Send"} disabled={loading} />
        </ContactForm>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Email sent successfully!"
          ContentProps={{
            style: { backgroundColor: 'green' }
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default Contact;
