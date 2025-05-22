import React from "react";
import { frameTypes } from "../../data/FrameTypes";
import FilterButton from "../Buttons/FilterButton";
import './FilterFrameStyle.css'

export default function FilterFrameTypes() {
    return (
        <div className="explore-frames d-flex flex-column gap-3 text-center" id="filter-type">
            <h2>Frame Types</h2>
            <div className="explore-frame-list d-flex justify-content-evenly align-items-center my-3 gap-4">
                {
                    frameTypes.map((frame, index) => {
                        return (
                            <a key={index} href="#frame-list"><FilterButton frame={frame} condititon = "type"/></a>
                        )
                    })
                }
            </div>
        </div>
    )
}