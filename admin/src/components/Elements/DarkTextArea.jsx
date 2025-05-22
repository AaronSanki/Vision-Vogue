import styled from 'styled-components';
import React from 'react';
export default function DarkTextArea({type, id, placeholder, style, className, required = false, rows, onChange, name, value}){
    return (
        <DInput value={value} onChange={onChange} name={name} rows = {rows} id={id} type = {type} className={className} style={style} placeholder = {placeholder} required = {required}/>
    )
}
const DInput = styled.textarea`
    outline: none;
    border: none;
    padding: .7rem;
    border-radius: .4rem;
    background-color: #2a2727;
    color: white;
`;