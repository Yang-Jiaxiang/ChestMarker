import React, { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";

import Main from "./component/Main";
import MarkEdit from "./component/MarkEdit";

import background from "./20180923002054.jpg";

function App() {
    const [azimut, setAzimut] = useState({
        L: [],
        R: [],
    });

    const [open, setOpen] = useState(false);
    const EditModalOpen = () => setOpen(true);
    const EditModalClose = () => setOpen(false);
    const [onEditMark, setOnEditMark] = useState({ side: "L", index: 0 });

    useEffect(() => {
        console.log(azimut);
    }, [azimut]);
    return (
        <Box
            sx={{ flexGrow: 1 }}
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
            }}
        >
            <Box
                style={{
                    width: "40%",
                    paddingTop: "300px",
                    paddingLeft:"350px"
                    
                }}
            >
                <Grid container spacing={2}>
                    {["L", "R"].map((side) => {
                        return (
                            <Grid item xs={6} md={6} key={side}>
                                <Main
                                    side={side}
                                    azimut={azimut}
                                    setAzimut={setAzimut}
                                    EditModalOpen={EditModalOpen}
                                    setOnEditMark={setOnEditMark}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
                <MarkEdit
                    azimut={azimut}
                    setAzimut={setAzimut}
                    open={open}
                    EditModalClose={EditModalClose}
                    EditModalOpen={EditModalOpen}
                    onEditMark={onEditMark}
                    setOnEditMark={setOnEditMark}
                />
            </Box>
        </Box>
    );
}

export default App;
