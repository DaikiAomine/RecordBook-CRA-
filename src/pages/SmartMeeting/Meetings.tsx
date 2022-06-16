import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import React from "react";

import buildings from '../../data/buildings.json';


const Meetings = (props: any) => {
    const buildingNames = buildings.data.Buildings
        .reduce((acc, curr) => {
            return acc + ":" + curr.name;
        }, "").split(":").slice(1);

    const [date, setDate] = React.useState<any>(
        new Date('2022-08-18T21:11:54'),
        );

    const curr = new Date();

    const [startTime, setStartTime] = React.useState<any>(curr);
    const [endTime, setEndTime] = React.useState<any>(curr);
    const [building, setBuilding] = React.useState('');
    const [error, setError] = React.useState(false);
    
    const handleDate = (newValue: any) => {
        setDate(newValue);
    };
    
    const handleStartTime = (st: any) => {
        setStartTime(st);
    };

    const handleEndTime = (et: any) => {
        setEndTime(et);
    };

    const handleBuilding = (b: any) => {
        setBuilding(b.target.value);
    }

    const handleNext = () => {
        if(date.getDate() < curr.getDate() || endTime < curr || startTime > endTime || building === '') {
            setError(true);
        } else {
            setError(false);
            props.handleMeeting({date, startTime, endTime, building});
        }
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
                    <h2>Add Meeting</h2>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <MobileDatePicker
                                    label="Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={date}
                                    onChange={handleDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TimePicker
                                    label="Start Time"
                                    value={startTime}
                                    onChange={handleStartTime}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TimePicker
                                    label="End Time"
                                    value={endTime}
                                    onChange={handleEndTime}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Building</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={building}
                                        label="Building"
                                        onChange={handleBuilding}
                                        >
                                            {
                                                buildingNames.map((bn, idx) => {
                                                    return <MenuItem key={idx} value={bn}>{bn}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Stack>
                        </LocalizationProvider>
                    
                    <Button sx={{mt: 10, width: 500}} variant="contained" onClick={handleNext}> Next </Button>
                    {error ? <p>Please check the times are correct</p> : <></>}
                </Paper>
            </Box>
        </>
    );
};

export default Meetings;