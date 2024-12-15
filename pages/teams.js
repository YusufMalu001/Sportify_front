import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamForm from "../components/TeamForm";
import TeamList from "../components/TeamList";
import { Container, Typography } from "@mui/material";

const Teams = () => {
    const [teams, setTeams] = useState([]);

    const fetchTeams = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/teams");
            setTeams(res.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Teams
            </Typography>
            <TeamForm onAddTeam={fetchTeams} />
            <TeamList teams={teams} />
        </Container>
    );
};

export default Teams;
