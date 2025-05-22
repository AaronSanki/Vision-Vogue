import styled from 'styled-components';
import React from 'react';
export default function DarkInput({type, id, placeholder, style, className, required = false, onChange, name, value}){
    return (
        <DInput onChange={onChange} name={name} id={id} type = {type} className={className} style={style} placeholder = {placeholder} value={value} required = {required}/>
    )
}
const DInput = styled.input`
    outline: none;
    border: none;
    padding: .7rem;
    border-radius: .4rem;
    background-color: #2a2727;
    color: white;
`;