import React from 'react'
import "./index.css"

export default function Loading() {
    return (
        <div>
            <h1>Google Loader</h1>
            <div className="container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    )
}
