import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMUNITY } from '../../utils/mutations';
// import { QUERY_COMMUNITIES, QUERY_ME } from '../../utils/queries';
import { Box, Textarea, Button } from '@chakra-ui/react'

const CommunityForm = () => {
    const [communityName, setName] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addCommunity, { error }] = useMutation(ADD_COMMUNITY, {
        // update(cache, { data: { addCommunity } }) {
        //     try {
        //         const { me } = cache.readQuery({ query: QUERY_ME});
        //         cache.writeQuery({
        //             query: QUERY_ME,
        //             data: { me: { ...me, communities: [...me.communities, addCommunity] } },
        //         });
        //     } catch (e) {
        //         console.warn("First community insertion by user!")
        //     }

        //     const { communities } = cache.readQuery({ query: QUERY_COMMUNITIES });
        //     console.log(communities)
        //     cache.writeQuery({
        //         query: QUERY_COMMUNITIES,
        //         data: { communities: [addCommunity, ...communities] },
        //     });
        // }
    });

    const handleChange = event => {
        if (event.target.value.length <= 20) {
            setName(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        function refreshPage() {
            window.location.reload(false);
        }

        try {
            // add thought to database
            await addCommunity({
                variables: { communityName }
            });

            // clear form value
            setName('');
            setCharacterCount(0);
            refreshPage();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box m={3}>
              <h3> Don't see a community that you like? Please use the following to submit your own community. </h3>
            <p className={`m-0 ${characterCount === 20 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/20
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
             
                <Textarea
                    placeholder="What's your community name?"
                    value={communityName}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></Textarea>
                <Button className="btn col-12 col-md-3" type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    );
}

export default CommunityForm;