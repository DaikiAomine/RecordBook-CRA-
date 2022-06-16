import { Box, Button, Divider, Paper } from '@mui/material';
import React from "react";

const Rooms = (props: any) => {
    const {build, saveMeeting, building: b} = props;

    const date = new Date();
    const timeNow = date.getHours() + ":" + date.getMinutes();
    let temp = new Set();
    let rooms: any[] = [];
    build
        .reduce((acc: any, curr: any) => {
            return acc + curr.meetingRooms.reduce((a: any, c: any) => {
                return a + c.meetings.reduce((ac: any, cr: any) => {
                    if(cr.startTime < timeNow && cr.endTime > timeNow) return ac + 1;
                    else if(b === curr.name && !temp.has(curr.name + c.name)) {
                        temp.add(curr.name + c.name);
                        rooms.push({building: curr.name, room: c.name});
                    };
                    return ac;
                }, 0);
            }, 0);
        }, 0);
    const [roomNum, setRoomNum] = React.useState(100);
    
    const selectMeeting = (index: any) => {
        setRoomNum(index);
    }

    const sendMeetingDetails = () => {
        saveMeeting({
            building: rooms[roomNum].building,
            room: rooms[roomNum].room
        });
    }

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
                    <h2>Please Select one of the free Rooms</h2>
                    <Divider />
                    {
                        rooms.map((t: any, idx: any) => 
                            <div key={idx}>
                                <h4>Meeting room - {t.room}</h4>
                                <p>Building - {t.building}</p>
                                <Button sx={{mb: 2}} variant={idx === roomNum ? "contained" : "outlined"} onClick={() => selectMeeting(idx)}>Select</Button>
                                <Divider />
                            </div>
                        )
                    }
                    
                    <Button sx={{mt: 2, width: 500}} variant="contained" onClick={sendMeetingDetails}> Save </Button>
                </Paper>
            </Box>
        </>
    );
};

export default Rooms;