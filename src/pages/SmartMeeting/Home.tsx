import React from "react";

import buildings from '../../data/buildings.json';
import meetings from '../../data/meetings.json';
import Buildings from "./Building";
import Meetings from "./Meetings";
import Rooms from "./Rooms";

const Home = () => {

    const [build, setBuild] = React.useState(buildings.data.Buildings);
    const [meet, setMeet] = React.useState(meetings.data.MeetingRooms);

    const totalBuildings = build.length;
    const totalRooms = meet.length;

    const [meetingsNow, setMeetingsNow] = React.useState(0);
    // let meetingsNow = build
    //     .reduce((acc, curr) => {
    //         return acc + curr.meetingRooms.reduce((a, c) => {
    //             return a + c.meetings.reduce((ac, cr) => {
    //                 if(cr.startTime < timeNow && cr.endTime > timeNow) return ac + 1;
    //                 return ac;
    //             }, 0);
    //         }, 0);
    //     }, 0);

    React.useEffect(() => {
        const date = new Date();
        const timeNow = date.getHours() + ":" + date.getMinutes();
        const x = build
        .reduce((acc, curr) => {
            return acc + curr.meetingRooms.reduce((a, c) => {
                return a + c.meetings.reduce((ac, cr) => {
                    if(cr.startTime < timeNow && cr.endTime > timeNow) return ac + 1;
                    return ac;
                }, 0);
            }, 0);
        }, 0);
        setMeetingsNow(x);
        setFreeRooms(totalRooms - x);
        setCurrMeetings(x);
    }, [build, totalRooms]);

    const [freeRooms, setFreeRooms] = React.useState(totalRooms - meetingsNow);
    const [totalMeetings, setTotalMeetings] = React.useState(meet
        .reduce((acc, curr) => {
            return acc + curr.meetings.length;
        }, 0));
    const [currMeetings, setCurrMeetings] = React.useState(meetingsNow);
    const [screen, showScreen] = React.useState(1);

    const handleAddMeeting = () => {
        showScreen(2);
    };

    const [details, setDetails] = React.useState<any>();
    const handleMeeting = (meetingDetails: any) => {
        setDetails(meetingDetails);
        showScreen(3);
    }

    const saveMeeting = ({room, building}: any) => {
        const {date, startTime, endTime} = details;
        setTotalMeetings(totalMeetings + 1);
        const newMeeting = meet.map((m) => {
            if(m.name === room && m.building.name === building) {
                m.meetings.push({
                    "title": "Booked for Interview"
                  });
            }
            return m;
        });
        setMeet(newMeeting);
        const updateBuilding = build.map(b => {
            if(b.name === building) {
               const meets = b.meetingRooms.map(m => {
                    if(m.name === room) {
                        m.meetings.push({
                            title: "Booked for Interview",
                            date: date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(),
                            startTime: startTime.getHours() + ":" + startTime.getMinutes(),
                            endTime: endTime.getHours() + ":" + endTime.getMinutes()
                        });
                    }
                    return m;
               });
               b.meetingRooms = meets;
            }
            return b;
        });
        setBuild(updateBuilding);
        showScreen(1);
    }

    return (
        <>
            {screen === 1 ? <Buildings 
                                totalBuildings={totalBuildings} 
                                totalMeetings={totalMeetings}
                                totalRooms={totalRooms}
                                freeRooms={freeRooms}
                                currMeetings={currMeetings}
                                handleAddMeeting={handleAddMeeting}
                            /> : <></>}
            {screen === 2 ? <Meetings handleMeeting={handleMeeting} /> : <></>}
            {screen === 3 ? <Rooms build={build} saveMeeting={saveMeeting} building={details.building} /> : <></> }
        </>
    );
};

export default Home;