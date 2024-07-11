import {InputGroup, Form, DropdownButton} from 'react-bootstrap';
function QHDropdown({title, input, value}) {
  return (
    <>
      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title={title}
          id="input-group-dropdown-1"
        >
          {input}
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" 
        value={value}
        readOnly/>
      </InputGroup>
    </>
  );
}

export default QHDropdown;