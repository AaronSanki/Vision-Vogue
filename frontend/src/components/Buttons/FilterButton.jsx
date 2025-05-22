import React from "react";
import styled from 'styled-components';
import { useFrame } from "../../store/index";
export default function FilterButton({frame, condition}) {
    const {selectedShape, setShape, selectedType, setType} = useFrame()
    const target = condition === "shape" ? selectedShape : selectedType;
    const method = condition === "shape" ? setShape : setType;
    const name = condition === "shape" ? frame.shape : frame.type;
    return(
        <Fbutton className="explore-frame d-flex flex-column align-items-center cursor-pointer m-2" onClick={()=>method(name)}>
            <span className={`image-container d-flex align-items-center justify-content-center ${target===name ? "active" : ""}`}>
                <img src={frame.image} alt={name} />
            </span>
            <p>{name}</p>
        </Fbutton>
    )
}

const Fbutton = styled.div`
    .cursor-pointer {
        cursor: pointer;
    }
    .image-container.active {
        transition: transform 0.2s ease;
        box-shadow: 0 0 0 2px rgb(255, 61, 0);
        transform: scale(1.05);
    }
    .image-container {
        display: inline-block;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color:aliceblue;
        transition: transform 0.4s ease, box-shadow 0.4s ease;
        padding: 1rem;
    }
`;