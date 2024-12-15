import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const Matches = () => {
    const [teamA, setTeamA] = useState("");
    const [teamB, setTeamB] = useState("");
    const [date, setDate] = useState("");
    const [matches, setMatches] = useState([]);

    // Fetch existing matches
    useEffect(() => {
        axios.get("http://localhost:5000/api/matches")
            .then((response) => {
                setMatches(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the matches!", error);
            });
    }, []);

    // Handle form submission to create a new match
    const handleSubmit = (e) => {
        e.preventDefault();

        const newMatch = {
            teamA: teamA,
            teamB: teamB,
            date: date,
        };

        axios.post("http://localhost:5000/api/matches", newMatch)
            .then((response) => {
                // After successful creation, fetch the updated list
                setMatches([...matches, response.data]);
                // Reset form
                setTeamA("");
                setTeamB("");
                setDate("");
            })
            .catch((error) => {
                console.error("There was an error creating the match!", error);
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Matches
            </Typography>

            {/* Match Form */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Team A"
                            fullWidth
                            value={teamA}
                            onChange={(e) => setTeamA(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Team B"
                            fullWidth
                            value={teamB}
                            onChange={(e) => setTeamB(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="datetime-local"
                            label="Match Date"
                            fullWidth
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Create Match
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {/* Match List */}
            <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
                Upcoming Matches
            </Typography>
            <List>
                {matches.map((match) => (
                    <ListItem key={match._id}>
                        <ListItemText
                            primary={`Team A: ${match.teamA} vs Team B: ${match.teamB}`}
                            secondary={`Date: ${new Date(match.date).toLocaleString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Matches;

