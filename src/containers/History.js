import React, { useState, useEffect } from 'react';
import {
    Badge,
    Button,
    Card,
    Row,
    Col,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText
} from 'reactstrap';
import HistoryItem from './HistoryItem';

const History = () => {

    const baseURL = "http://localhost:8000";
    const historyApi = "/api/user/history";

    const [state, setState] = useState({
        initData: true,
        history: [],
        page: 0,
        size: 10,
    })

    const fetchHistory = () => {
        const api = baseURL + historyApi + "?page=" + state.page + "&size=" + state.size;
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
                console.log('error');
            });
    }

    useEffect(() => {
        if(state.initData){
            fetchHistory();
        }
    },[state.initData])

    return (
        <div style={{ maxHeight: '400vh' }}>
            <ListGroup>
                {
                    state.history.map((history, index) => {
                        return <HistoryItem key={ index } history={ history } />
                    })
                }
            </ListGroup>
        </div>
    )
}

export default History;