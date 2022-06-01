import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_IDEE } from '../../utils/mutations';
import { QUERY_IDEES, QUERY_ME } from '../../utils/queries';

const IdeeForm = () => {
    const [ideeText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addIdee, { error }] = useMutation(ADD_IDEE, {
        update(cache, { data: { addIdee } }) {

            // could potentially not exist yet, so wrap in a try/catch
            try {
                // update me array's cache
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, idees: [...me.idees, addIdee] } },
                });
            } catch (e) {
                console.warn("First Idee insertion by user!");
            }

            // update thought array's cache
            const { idees } = cache.readQuery({ query: QUERY_IDEES });
            cache.writeQuery({
                query: QUERY_IDEES,
                data: { idees: [addIdee, ...idees] },
            });
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add thought to database
            await addIdee({
                variables: { ideeText }
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
            <p className={`m-0 ${characterCount === 50 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/50
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="What is your Idee?"
                    value={ideeText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default IdeeForm;