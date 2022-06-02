import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMUNITYIDEE } from '../../utils/mutations';
import { Textarea } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react"

const CommunityIdeeForm = ({ communityName }) => {
    const [communityIdeeText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addCommunityIdee, { error }] = useMutation(ADD_COMMUNITYIDEE);

    // update state based on form input changes
    const handleChange = (event) => {
        if (event.target.value.length <= 50) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addCommunityIdee({
                variables: { communityIdeeText, communityName },
            });

            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box m={3}>
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
                    placeholder="Leave your Idee..."
                    value={communityIdeeText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></Textarea>

                <Button className="btn col-12 col-md-3" type="submit">
                    Submit
                </Button>
            </form>

            {error && <div>Something went wrong...</div>}
        </Box>
    );
};

export default CommunityIdeeForm;