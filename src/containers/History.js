import React, { useState, useEffect } from 'react';
import {
    ListGroup
} from 'reactstrap';
import HistoryItem from './HistoryItem';
import Notification from './Notification';
import Config from '../Config';

const History = () => {
    const historyApi = "/api/user/history";

    const [state, setState] = useState({
        initData: true,
        history: [],
        page: 0,
        size: 10,

        displayErr: false,
        messageErr: "",
    });

    

    const fetchHistory = () => {
        const api = Config.server.BaseUrl + historyApi + "?page=" + state.page + "&size=" + state.size;
        const token = localStorage.getItem('session-id');
        fetch(api, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token
            },
            mode: 'cors',
        })
        .then(response => {
            let respData = response.json();
            return respData;
        })
        .then(data => {
            const newData = state.history.slice();
            newData.concat(data);
            setState(prevHistory => ({
                ...prevHistory,
                history: data,
            }))
        })
        .catch(err => {
            setState(prevHistory => ({
                ...prevHistory,
                displayErr: true,
                messageErr: "Cannot retrive game history from server."
            }))
        });
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = Config.server.BaseUrl + historyApi + "?page=" + 0 + "&size=" + 10;
                const token = localStorage.getItem('session-id');
                const response = await fetch(api, {
                    method: 'GET',
                    headers: {
                        'Authorization': "Bearer " + token
                    },
                    mode: 'cors',
                });
        
                if (!response.ok) {
                    throw new Error(
                        `${response.status} ${response.statusText}`
                    );
                }
        
                const data = await response.json();
        
                setState(prevHistory => ({
                    ...prevHistory,
                    history: data,
                    page: 0,
                    size: 10,
                }));
            } catch (e) {
                setState(prevHistory => ({
                    ...prevHistory,
                    displayErr: true,
                    messageErr: "Cannot retrive game history from server."
                }));
            }
        };
        fetchData();
        
    },[historyApi]);

    return (
        <div style={{ maxHeight: '400vh' }}>
            { state.displayErr && <Notification correct={ false } message={ state.messageErr } /> }
            <ListGroup>
                {
                    state.history.map((history, index) => {
                        return <HistoryItem key={ index } history={ history } />
                    })
                }
            </ListGroup>
        </div>
    )
};

export default History;