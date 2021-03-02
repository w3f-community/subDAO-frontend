import React, {useState, useEffect} from 'react';
import * as history from 'history';
import {Form} from "react-bootstrap";
import {useSubstrate} from "../api/contracts";

const createHashHistory = history.createHashHistory();


export default function Headertop() {
    const {state,dispatch} = useSubstrate();
    const {allAccounts} = state;

    const [showHeader, setshowHeader] = useState(false);
    let [allList, setallList] = useState([]);
    const [selected, setselected] = useState([]);

    useEffect(() => {
        setshowHeader(createHashHistory.location.pathname !== '/')
        createHashHistory.listen((obj) => {
            setshowHeader(createHashHistory.location.pathname !== '/')
        });
    }, [setshowHeader]);

    useEffect(() => {
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
    }, []);

    const backNav = () => {
        createHashHistory.goBack()

    }

    const backHome = () => {

        createHashHistory.push(`/`)
    }

    const selectAccounts = (e) => {
        let selected = allList.filter(i => i.address === e.target.value);
        setselected(selected);
        sessionStorage.setItem('account', JSON.stringify(selected))
    }
    useEffect(() => {
        if(allAccounts && allAccounts.length ){
            setallList(allAccounts);
        }
    }, [allAccounts]);
    const connectWallet = async () => {
        dispatch({type: 'LOAD_ALLACCOUNTS'});
    }


    return (<div className='container header'>
        <div className="row">
            <div className='col-6 leftText'>
                {
                    showHeader &&
                    <div>
                        <span onClick={backNav}><i className='fa fa-chevron-left'/>Prev</span>
                        <span onClick={backHome}>Home</span>
                    </div>
                }
            </div>
            <div className='col-6 rightText'>
                <div className="header-button">
                    {
                        !selected.length && !allList.length &&
                        <button className='btn' onClick={connectWallet}>Connect Wallet</button>
                    }
                    {!selected.length && !!allList.length &&
                    <Form.Control as="select" onChange={(event) => selectAccounts(event)}>
                        <option value=''>Select Option</option>
                        {
                            allList.map((opt) =>
                                <option value={opt.address} key={opt.address}>{opt.meta.name}</option>
                            )
                        }
                    </Form.Control>
                    }
                    {!!selected.length &&
                    <div className='topName'>Account: <span>{selected[0].meta.name}</span></div>
                    }
                </div>
            </div>

        </div>
    </div>);

}
