import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamForm from "../components/TeamForm";
import TeamList from "../components/TeamList";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTeams = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get("http://localhost:5000/api/teams");
            setTeams(res.data);
        } catch (err) {
            setError("There was an error fetching teams.");
            console.error(err.message);
        } finally {
            setLoading(false);
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

            {error && <Alert severity="error">{error}</Alert>}

            <TeamForm onAddTeam={fetchTeams} />

            {loading ? (
                <CircularProgress />
            ) : (
                <TeamList teams={teams} />
            )}
        </Container>
    );
};

export default Teams;
