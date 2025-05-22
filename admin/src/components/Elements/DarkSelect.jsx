import React, { useState } from 'react';
import { styled } from 'styled-components';

export default function DarkSelect({title = "--Select an Option--", data, id, required = false, className, style, onChange, name, value}) {
  return (
    <DSelect value={value} name = {name} id={id} className = {className} style = {style} onChange={onChange} required = {required}>
        <option value="">{title}</option>
        {(data || []).map((option, index) => (
            <option key={index} value={option}>{option}</option>
        ))}
    </DSelect>
  )
}
const DSelect = styled.select`
  cursor: pointer;
  outline: none;
  border: none;
  padding: .5rem;
  border-radius: .4rem;
  background-color: #2a2727;
  color: white;
  opacity: 0.75;
`;