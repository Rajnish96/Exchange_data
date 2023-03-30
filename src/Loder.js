import React from 'react'
import Load from "react-js-loader";
const Loader = ({ loading }) => {
    if (loading) {
        return (<div className="loader-container">
            <div className="loader">
                <Load type="box-rectangular" bgColor={"#ffff"} color={"white"} title={"Loading..."} size={100} />
            </div>
        </div>)
    }
    else {
        return null
    }
}

export default Loader