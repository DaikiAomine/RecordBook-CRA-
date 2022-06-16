import { Box, Button, Divider, Paper } from '@mui/material';
import React from "react";

const Buildings = (props: any) => {
    const {totalBuildings, totalMeetings, totalRooms, freeRooms, currMeetings, handleAddMeeting} = props;
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                    m: 1,
                    p:2,
                    width: 500,
                    height: 450,
                    },
                }}
                >
                <Paper variant="outlined" square>
                    <h2>Buildings</h2>
                    <p>Total - {totalBuildings}</p>
                    <Divider />
                    <h2>Rooms</h2>
                    <p>Total - {totalRooms}</p>
                    <p>Free now - {freeRooms}</p>
                    <Divider/>
                    <h2>Meetings</h2>
                    <p>Total {totalMeetings} today</p>
                    <p>Total {currMeetings} going on now</p>
                    <Divider />
                    <Button sx={{mt: 2, width: 500}} variant="contained" onClick={handleAddMeeting}> Add a meeting </Button>
                </Paper>
            </Box>
        </>
    );
};

export default Buildings;