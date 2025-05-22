import React from "react";
import './Sidebar.css'
import { Plus, ListOrdered, CalendarArrowDown } from 'lucide-react'
import { useNavigate, useLocation } from "react-router-dom"
export default function Sidebar() {
    const location = useLocation()
    const navigate = useNavigate()
    return(
        <div className="sidebar">
            <div className="sidebar-options">
                <div className={`sidebar-option ${location.pathname==="/add" ? "active":""}`} onClick={() => navigate("add")}>
                    <Plus/>
                    <p>Add Frames</p>
                </div>
                <div className={`sidebar-option ${location.pathname==="/list" ? "active":""}`} onClick={() => navigate("list")}>
                    <ListOrdered/>
                    <p>List Frames</p>
                </div>
                <div className={`sidebar-option ${location.pathname==="/order" ? "active":""}`} onClick={() => navigate("order")}>
                    <CalendarArrowDown/>
                    <p>Order</p>
                </div>
            </div>
        </div>
    )
}