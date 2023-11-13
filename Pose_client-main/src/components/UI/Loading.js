import {ClipLoader} from "react-spinners";
import React from "react";

export const Loading = () => {
    return (
        <div className="loading">
            <ClipLoader
                size={20}
                color={'#123abc'}
                loading={true}
            />
        </div>
    );

}
