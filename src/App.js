import React, { useEffect, useState, useRef } from "react";

import { Box, Typography, Slider, Input, Grid } from "@mui/material";

import Line from "./Line";

function App() {
    const [azimut, setAzimut] = useState({
        Azimut: {
            x: 0,
            y: 0,
        },
        Size: 10,
    });
    console.log(azimut);

    //設定胸部大小
    const ChestMaxSize = 200; 
    const PageRef = useRef(null);
    const ClockRef = useRef(null);
    // 一釐米多少px
    const [pxToMM, setPxToMM] = useState(0);
    //點點的樣式
    const [circleStyle, setCircleStyle] = useState({
        border: "1px solid black",
        position: "absolute",
        borderRadius: "50%",
        backgroundColor: "red",
    });
    // 計算一釐米多少px
    useEffect(() => {
        if (PageRef.current) {
            setPxToMM(PageRef.current.offsetWidth / 400);
        }
    }, []);

    useEffect(() => {
        setCircleStyle((circleStyle) => ({
            ...circleStyle,
            top: azimut.Azimut.y * pxToMM - (azimut.Size * pxToMM) / 2 + "px",
            left: azimut.Azimut.x * pxToMM - (azimut.Size * pxToMM) / 2 + "px",
            width: azimut.Size * pxToMM + "px",
            height: azimut.Size * pxToMM + "px",
        }));
    }, [azimut]);

    //滑鼠移動
    const handClick = (event) => {
        var Azimut = {
            x: (event.nativeEvent.pageX - ClockRef.current.offsetLeft) / pxToMM,
            y: (event.nativeEvent.pageY - ClockRef.current.offsetTop) / pxToMM,
        };
        setAzimut((azimut) => ({
            ...azimut,
            Azimut,
        }));
    };

    //限制移動範圍
    const handleBlur = () => {
        if (azimut.Size < 0) {
            setAzimut((azimut) => ({ ...azimut, Size: 0 }));
        } else if (azimut.Size > 100) {
            setAzimut((azimut) => ({ ...azimut, Size: 100 }));
        }
    };

    //計算距離圓心的距離
    function PythagoreanTheorem(x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    //計算角度
    function calcAngleDegrees(x, y) {
        x = x.toFixed(2) - ChestMaxSize / 2;
        if (y > ChestMaxSize / 2) {
            y = -Math.abs(azimut.Azimut.y.toFixed(2) - ChestMaxSize / 2);
        } else {
            y = Math.abs(azimut.Azimut.y.toFixed(2) - ChestMaxSize / 2);
        }
        return (Math.atan2(y, x) * 180) / Math.PI;
    }

    //計算時鐘的角度
    function calculatevHour(x) {
        if (x <= 180 && x > 150) {
            return 9;
        } else if (x <= 150 && x > 120) {
            return 10;
        } else if (x <= 120 && x > 90) {
            return 11;
        } else if (x <= 90 && x > 60) {
            return 12;
        } else if (x <= 60 && x > 30) {
            return 1;
        } else if (x <= 30 && x > 0) {
            return 2;
        } else if (x <= 0 && x > -30) {
            return 3;
        } else if (x <= -30 && x > -60) {
            return 4;
        } else if (x <= -60 && x > -90) {
            return 5;
        } else if (x <= -90 && x > -120) {
            return 6;
        } else if (x <= -120 && x > -150) {
            return 7;
        } else if (x <= -150 && x > -180) {
            return 8;
        } else {
            return 0;
        }
    }

    return (
        <div className="App">
            <Box width="100%" ref={PageRef}>
                <Box style={{ margin: "10px 0px 0px 10px" }}>
                    <Typography id="input-slider" gutterBottom>
                        腫瘤大小：
                        <Input
                            value={azimut.Size}
                            size="small"
                            onChange={(event) => {
                                setAzimut((azimut) => ({
                                    ...azimut,
                                    Size: event.target.value,
                                }));
                            }}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: "number",
                                "aria-labelledby": "input-slider",
                            }}
                        />
                        mm
                    </Typography>
                    <Slider
                        aria-label="Temperature"
                        value={azimut.Size}
                        onChange={(event, value) => {
                            setAzimut((azimut) => ({
                                ...azimut,
                                Size: value,
                            }));
                        }}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        style={{ width: "80%" }}
                        min={0}
                        max={100}
                    />
                    <Typography>
                        方位：
                        {calculatevHour(
                            calcAngleDegrees(azimut.Azimut.x, azimut.Azimut.y)
                        )}
                        點鐘方向， 距離中心點：
                        {PythagoreanTheorem(
                            Math.abs((azimut.Azimut.x / 10 - 10).toFixed(2)),
                            Math.abs((azimut.Azimut.y / 10 - 10).toFixed(2))
                        ).toFixed(2)}
                        CM
                    </Typography>
                </Box>

                <div
                    id="container"
                    onClick={handClick}
                    ref={ClockRef}
                    style={{
                        width: ChestMaxSize * pxToMM + "px",
                        height: ChestMaxSize * pxToMM + "px",
                        border: "1px solid black",
                        position: "relative",
                        borderRadius: "50%",
                    }}
                >
                    {[1, 2, 3, 4, 5, 6].map((item) => {
                        return PageRef.current ? (
                            <Line
                                width={ChestMaxSize * pxToMM}
                                angle={item}
                                top={(ChestMaxSize * pxToMM) / 2}
                            />
                        ) : (
                            <Line width={0} angle={item}></Line>
                        );
                    })}
                    <div id="circle" style={circleStyle}></div>
                </div>
            </Box>
        </div>
    );
}

export default App;
