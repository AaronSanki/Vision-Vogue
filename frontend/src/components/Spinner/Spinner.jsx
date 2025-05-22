import React from "react"
import "./Spinner.css"
export default function Spinner({style, spinStyle}) {
    return (
        <div style = {style} className="spinner d-flex justify-content-center align-items-center">
            <div style = {spinStyle} className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}