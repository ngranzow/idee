import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMUNITYIDEE } from '../../utils/mutations';

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
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    value={communityIdeeText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>

            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default CommunityIdeeForm;