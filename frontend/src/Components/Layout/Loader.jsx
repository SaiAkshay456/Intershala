import React from 'react'
import { ClipLoader } from 'react-spinners';
const Loader = () => {
    return (
        <div className="text-center">
            <ClipLoader size={50} color={"#000"} loading={loading} />
        </div>
    )
}

export default Loader;
