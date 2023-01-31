import React, { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";

import Main from "./component/Main";
import MarkEdit from "./component/MarkEdit";

function ChestMarker() {
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
        <Box sx={{ flexGrow: 1 }}>
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
    );
}

export default ChestMarker;
