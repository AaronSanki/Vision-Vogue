import React from "react";
import { frameShapes } from "../../data/FrameShapes";
import FilterButton from "../Buttons/FilterButton";
import './FilterFrameStyle.css'
export default function FilterFrameShapes() {
    return (
        <div className="explore-frames d-flex flex-column gap-3 text-center" id="filter-shape">
            <h2>Frame Shapes</h2>
            <div className="explore-frame-list d-flex justify-content-between align-items-center my-3 gap-4">
                {
                    frameShapes.map((frame, index) => {
                        return (
                            <a key = {index}><FilterButton frame={frame} condition = {"shape"}/></a>
                        )
                    })
                }
            </div>
        </div>
    )
}