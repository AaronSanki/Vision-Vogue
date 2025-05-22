import React, { useEffect } from "react";
import './Home.css'
import Header from "../../components/Header/Header";
import FilterFrameShapes from "../../components/FilterFrames/FilterFrameShapes.jsx";
import FilterFrameTypes from "../../components/FilterFrames/FilterFrameTypes.jsx";
import FrameList from '../../components/FrameList/FrameList.jsx'
import AppDownload from "../../components/AppDownload/AppDownload";
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