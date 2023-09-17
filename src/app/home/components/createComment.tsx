import '../home.scss';

import { useState } from 'react';

import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function CreateInput({ placeholder, onSubmit }: { placeholder?: string, onSubmit: (text: string) => void }) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  const handleStatusInputFocus = () => {
    setIsFocused(true);
  };

  const handleStatusInputBlur = () => {
    setIsFocused(false);
  };

  const handleOnSubmit = (text: string) => {
    // Check if the trimmed input text is not empty (no leading/trailing whitespace)
    if (text.trim() !== '') {
      // Call the onSubmit callback with the input text
      onSubmit(text);

      // Clear the input field
      setInputText('');
    }
  };

  const inputClass: string = `profile__input${isFocused ? ' profile__input--focused' : ''}`;
  const inputPlaceholder: string = placeholder ? placeholder : 'Enter your text';
  const ariaLabel: string = placeholder ? placeholder : 'createInputField';

  return (
    <InputGroup className={inputClass}>
      <Form.Control
        placeholder={inputPlaceholder}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel}
        onFocus={handleStatusInputFocus}
        onBlur={handleStatusInputBlur}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button variant="light" onClick={() => {handleOnSubmit(inputText)}}>
        <FontAwesomeIcon icon={faPaperPlane} className='me-0'></FontAwesomeIcon>
      </Button>
    </InputGroup>
  )
}
