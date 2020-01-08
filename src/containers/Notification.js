import React from 'react';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ correct, message }) => {
    var color
    
    if(correct){
        color = "success";
    } else {
        color = "danger";
    }

    
    return (
        <Alert color={ color }>
            { correct && <FontAwesomeIcon icon={faCheckCircle} /> } { !correct && <FontAwesomeIcon icon={faTimesCircle} /> }  { message }
        </Alert>
    )
}

export default Notification;