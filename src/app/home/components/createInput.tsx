import '../home.scss';

import { useEffect, useMemo, useState } from 'react';

import debounce from 'lodash/debounce';

import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function CreateInput({
  value,
  placeholder,
  showSubmitButton = true,
  onSubmit
}: {
  value?: string,
  placeholder?: string,
  showSubmitButton?: boolean,
  onSubmit: (text: string) => void
}): React.ReactNode {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  // Synchronize inputText with the value prop
  useEffect(() => {
    setInputText(value || '');
  }, [value]);

  const handleStatusInputFocus = (): void => {
    setIsFocused(true);
  };

  const handleStatusInputBlur = (): void => {
    setIsFocused(false);
  };

  const handleOnSubmit = (text: string) => {
    // Check if the trimmed input text is not empty - no trailing whitespace
    if (text.trim() !== '') {
      onSubmit(text);
      setInputText('');
    }
  };

  const inputClass: string = `profile__input${isFocused ? ' profile__input--focused' : ''}`;
  const inputPlaceholder: string = placeholder ? placeholder : 'Enter your text';
  const ariaLabel: string = placeholder ? placeholder : 'createInputField';

  // Create the debounced function only once
  const handleInputChangeDebounced = useMemo(() => {
    return debounce((text: string) => {
      onSubmit(text); // Pass data to parent
    }, 500);
  }, [onSubmit]);

  // Notify the parent component of input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setInputText(text);

    if(showSubmitButton) {
      return;
    }

    handleInputChangeDebounced(text); // trigger debounced function
  };

  return (
    <InputGroup className={inputClass}>
      <Form.Control
        placeholder={inputPlaceholder}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel}
        onFocus={handleStatusInputFocus}
        onBlur={handleStatusInputBlur}
        value={inputText}
        onChange={handleInputChange}
      />
      {showSubmitButton && (
        <Button
          id='createInputSubmitBtn'
          variant="light"
          aria-label='Create input submit button'
          aria-labelledby='createInputSubmitBtn1'
          onClick={() => {handleOnSubmit(inputText)}}
        >
          <FontAwesomeIcon icon={faPaperPlane} className='me-0'></FontAwesomeIcon>
        </Button>
      )}
    </InputGroup>
  )
}
