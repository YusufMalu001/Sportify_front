import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const Tournaments = () => {
    const [tournamentName, setTournamentName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [tournaments, setTournaments] = useState([]);

    // Fetch existing tournaments
    useEffect(() => {
        axios.get("http://localhost:5000/api/tournaments")
            .then((response) => {
                setTournaments(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the tournaments!", error);
            });
    }, []);

    // Handle form submission to create a new tournament
    const handleSubmit = (e) => {
        e.preventDefault();

        const newTournament = {
            name: tournamentName,
            startDate: startDate,
            endDate: endDate,
        };

        axios.post("http://localhost:5000/api/tournaments", newTournament)
            .then((response) => {
                // After successful creation, fetch the updated list
                setTournaments([...tournaments, response.data]);
                // Reset form
                setTournamentName("");
                setStartDate("");
                setEndDate("");
            })
            .catch((error) => {
                console.error("There was an error creating the tournament!", error);
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Tournaments
            </Typography>

            {/* Tournament Form */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Tournament Name"
                            fullWidth
                            value={tournamentName}
                            onChange={(e) => setTournamentName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="date"
                            label="Start Date"
                            fullWidth
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="date"
                            label="End Date"
                            fullWidth
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Create Tournament
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {/* Tournament List */}
            <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
                Existing Tournaments
            </Typography>
            <List>
                {tournaments.map((tournament) => (
                    <ListItem key={tournament._id}>
                        <ListItemText
                            primary={tournament.name}
                            secondary={`Start Date: ${new Date(tournament.startDate).toLocaleDateString()} | End Date: ${new Date(tournament.endDate).toLocaleDateString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Tournaments;

