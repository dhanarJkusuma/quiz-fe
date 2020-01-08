import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = ({ color, message }) => {
    return (
        <div style={{
            width: '100%',
            textAlign: 'center'
        }}>
            <Spinner type="grow" color={ color } />
            <br />
            { message }

        </div>
    );
};

export default Loading;