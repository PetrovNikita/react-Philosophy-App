import React, { useState, useEffect } from 'react';

const withData = (Wrapped) => {
    return (props) => {

        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);

        useEffect( () => {
            props.getData()
                .then( (data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch( ()=> {
                    setError(true);
                    setLoading(false);
                })
        }, [props.getData]);

        if (loading) {
            return <div>loading ...</div>;
        }

        if (error) {
            return <div>Error! Please reload the page.</div>;
        }

          return <Wrapped {...props} data={data} />;
    };
};

export default withData;