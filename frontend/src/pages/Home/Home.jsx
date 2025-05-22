import React, { useEffect } from "react";
import './Home.css'
import Header from "../../Components/Header/Header";
import FilterFrameShapes from "../../Components/FilterFrames/FilterFrameShapes.jsx";
import FilterFrameTypes from "../../Components/FilterFrames/FilterFrameTypes.jsx";
import FrameList from '../../Components/FrameList/FrameList.jsx'
import AppDownload from "../../Components/AppDownload/AppDownload";
import { useApp } from "../../store/index";
export default function Home() {
    const { showSignIn } = useApp();
    useEffect(() => {
        document.body.style.overflow = showSignIn ? "hidden" : "auto";
    }, [showSignIn]);
    return (
        <>
            <Header/>
            <hr />
            <FilterFrameShapes/>
            <hr />
            <FilterFrameTypes/>
            <hr />
            <FrameList/>
            <hr />
            <AppDownload/>
        </>
    )
}