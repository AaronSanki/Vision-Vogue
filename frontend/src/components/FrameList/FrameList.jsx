import Frame from "./Frame/Frame"
import { useApp, useFrame } from "../../store/index";
import axios from "axios"
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
export default function FrameList() {
    const {selectedShape, selectedType, frames, setFrames} = useFrame();
    const {url, toastStyle} = useApp()
    useEffect(() => {
        async function fetchFrames() {
            const res = await axios.get(url+"/api/frame/list")
            if(res.data.success) {
                setFrames(res.data.data)
            }
            else {
                toast.error("Error: Couldn't fetch Frames", toastStyle)
            }
        }
        fetchFrames()
    }, [])
    if(!frames)
        return <Spinner/>
    const filteredFrames = frames.filter(frame =>
            (selectedShape === "All" || selectedShape === frame.shape) &&
            (selectedType === "All" || selectedType === frame.type)
        )
        .sort((a, b) => b.rating - a.rating);
    return(
        <div className="text-center" id="frame-list">
            <h1>Frames</h1>
            <div className="py-5 text-center">
                <div className="container">
                    <div className="row">
                    {
                        filteredFrames.length > 0 ? (
                            <div className="row">
                                {
                                    filteredFrames.map(frame => (
                                        <Frame key={frame._id} frame={frame} />
                                    ))
                                }
                            </div>
                        ) : (
                            <p>Sorry, we're out of Stock now :(</p>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}