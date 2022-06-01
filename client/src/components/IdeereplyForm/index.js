import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REPLY } from '../../utils/mutations';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
const ReplyForm = ({ ideeId }) => {
  const [replyBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addReply, { error }] = useMutation(ADD_REPLY);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 50) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addReply({
        variables: { replyBody, ideeId },
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 50 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/50
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <Textarea
          placeholder="Leave a reply to this idee..."
          value={replyBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></Textarea>

        <Button className="btn col-12 col-md-3" type="submit">
          Submit
        </Button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default ReplyForm;
