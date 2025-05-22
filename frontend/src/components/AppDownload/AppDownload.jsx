import React from "react";
import PlayStore from '../../assets/Download/PlayStore.webp'
import AppStore from '../../assets/Download/AppStore.webp'
import './AppDownload.css'

export default function AppDownload() {
    return (
        <div className="app-download" id="app-download">
            <h2>For Better Experience Download <br /> Vision Vogue App </h2>
            <div className="img-container">
                <img src={PlayStore} alt="PlayStore" />
                <img src={AppStore} alt="AppStore" />
            </div>
        </div>
    )
}