import { Link } from 'react-router-dom';

//CHAKRA
// import React from 'react'
// import {useMediaQuery} from '@chakra-ui/media-query'
// import {Flex} from '@chakra-ui/layout';



const Communities = ({ communities, title }) => {

    //MEDIA QUERY
    // const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

    if (!communities.length) {
        
        return <h5>Create a community!</h5>;
    }

    

    return (
        
        <div className = "visible-scrollbar">
            {/* <Flex direction={isNotSmallerScreen ? "row": "column"}
        spacing="200px" p={isNotSmallerScreen ? "32" : "0"}
        alignSelf="flex-start"> */}
             
            <h3>{title}</h3>
            {communities &&
                communities.map(community => (
                    <div key={community._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/youridee/${community.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {community.username}
                            </Link>{' '}
                            Community created on {community.createdAt}
                        </p>
                        <div className="card-body">
                            <Link to={`/community/${community.communityName}`}>
                                <p>{community.communityName}</p>
                            </Link>
                        </div>
                    </div>
                ))}
                
                {/* </Flex> */}
        </div>
        
    );
};

export default Communities;