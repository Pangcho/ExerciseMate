import React from "react";
import {ThemeColor} from "./UIPackage";

export const HorizonLine = () => {
    return (
        <div style={{
            width: "280px",
            alignSelf: 'center',
            textAlign: "center",
            borderBottom: `1.5px solid ${ThemeColor.divColor}`,
            lineHeight: "0.1em",
            margin: "10px 0 20px",
        }}>
        </div>
    );
};
