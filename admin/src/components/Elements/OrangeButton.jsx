import styled from 'styled-components';
import React from 'react';

export default function OrangeButton({title, onClick, style, className, type}){
    return (
        <Obutton type={type} className={className} style={style} onClick={onClick}>{title}</Obutton>
    )
}
const Obutton = styled.button`
    border-radius: .5rem !important;
    border: none !important;
    font-size: 14px !important;
    padding: 5px 15px;
    background-color: rgb(255, 61, 0);
    font-family: "Reddit Mono", monospace !important;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    transition: transform 0.1s ease;
    &:active {
        transform: scale(0.9);
    }
`;