import React, { useState, useEffect, useRef } from "react";
import Line from "./Line";
import Mark from "./Mark";
import { Box } from "@mui/material";
import {
    calculatevHour,
    calcAngleDegrees,
    PythagoreanTheorem,
} from "./js/calculate";
const Main = ({ side, EditModalOpen, azimut, setAzimut, setOnEditMark }) => {
    //胸部最大直徑
    const ChestMaxSize = 200;
    //一釐米多少px\
    const [pxToMM, setPxToMM] = useState(0);

    const PageRef = useRef(null);
    const ClockRef = useRef(null);

    useEffect(() => {
        if (PageRef.current) {
            setPxToMM(PageRef.current.offsetWidth / 250);
        }
    }, []);

    const containerStyle = {
        width: ChestMaxSize * pxToMM + "px",
        height: ChestMaxSize * pxToMM + "px",
        border: "1px solid black",
        position: "relative",
        borderRadius: "50%",
        left:
            PageRef?.current?.offsetWidth / 2 -
            (ChestMaxSize * pxToMM) / 2 +
            "px",
    };

    const rightClick = (event) => {
        event.preventDefault();
        var Azimut = {
            x: (event.nativeEvent.pageX - ClockRef.current.offsetLeft) / pxToMM,
            y: (event.nativeEvent.pageY - ClockRef.current.offsetTop) / pxToMM,
        };
        const tempAzimut = azimut[side];
        tempAzimut.push({ Azimut, Size: 10 });
        setAzimut((azimut) => ({ ...azimut, [side]: [...tempAzimut] }));
    };

    return (
        <Box style={{ textAlign: "center" }} ref={PageRef}>
            <h2>{side}</h2>
            <div
                id="container"
                style={containerStyle}
                ref={ClockRef}
                onContextMenu={rightClick}
            >
                {[1, 2, 3, 4, 5, 6].map((item) => {
                    return PageRef.current ? (
                        <Line
                            width={ChestMaxSize * pxToMM}
                            angle={item}
                            top={(ChestMaxSize * pxToMM) / 2}
                            key={item}
                        />
                    ) : (
                        <Line width={0} angle={item} key={item}></Line>
                    );
                })}
            </div>
            {azimut[side].length > 0
                ? azimut[side].map((item, index) => {
                      return (
                          <Mark
                              key={index}
                              side={side}
                              index={index}
                              azimut={item}
                              ClockRef={ClockRef}
                              pxToMM={pxToMM}
                              EditModalOpen={EditModalOpen}
                              setOnEditMark={setOnEditMark}
                          />
                      );
                  })
                : null}
            <Box style={{ textAlign: "left" }}>
                <ul>
                    {azimut[side].length > 0
                        ? azimut[side].map((item, index) => {
                              console.log(item);
                              return <li key={index}>{listText(item)}</li>;
                          })
                        : null}
                </ul>
            </Box>
        </Box>
    );
};

const listText = (azimut) => {
    const text =
        calculatevHour(calcAngleDegrees(azimut.Azimut.x, azimut.Azimut.y)) +
        "點鐘，距離" +
        PythagoreanTheorem(
            Math.abs(azimut.Azimut.x / 10 - 10),
            Math.abs(azimut.Azimut.y / 10 - 10)
        ).toFixed(2) +
        "公分，大小" +
        azimut.Size +
        "mm";
    return text;
};

export default Main;
