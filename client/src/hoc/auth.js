import { Axios } from 'axios';
//import { response } from 'express';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function(SpecificComponent, option, adiminRoute = null){

    //option
    //null=>아무나 출입가능
    //true=> login 한 user만
    //false=> login 한 user 출입불가

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(()=> {

            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    //로그인 한 상태
                    if(adiminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{//로그인한유저가register or login로 들어갈려고할때 
                        if(option===false)
                            props.history.push('/')
                    }

                }
            })

            
        }, [])
        return (
            <SpecificComponent />
        )
    }



    return AuthenticationCheck
}