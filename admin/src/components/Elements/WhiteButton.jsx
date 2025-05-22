import styled from 'styled-components'
import React from 'react'
export default function WhiteButton({title, onClick, style, className, type}){
    return (
        <Wbutton type={type} className= {className} style={style} onClick={onClick}>{title}</Wbutton>
    )
}
const Wbutton = styled.button`
    border-radius: .5rem !important;
    border: none !important;
    font-size: 1rem;
    padding: 5px 10px;
    font-family: "Reddit Mono", monospace !important;
    background-color: white;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    transition: transform 0.1s ease;
    &:active {
        transform: scale(0.9);
    }
`;