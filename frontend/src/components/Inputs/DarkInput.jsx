import styled from 'styled-components';
export default function DarkInput({type, id, name, placeholder, style, className, required = false, onChange, value}){
    return (
        <DInput id={id} type = {type} onChange={onChange} value = {value} name = {name} className={className} style={style} placeholder = {placeholder} required = {required}/>
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