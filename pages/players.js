import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button, Grid, Card, CardContent, TextField } from "@mui/material";

export default function Players() {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState({ name: "", age: "" });

    const fetchPlayers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/players");
            setPlayers(res.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const addPlayer = async () => {
        try {
            await axios.post("http://localhost:5000/api/players", newPlayer);
            fetchPlayers(); // Refresh list
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Players
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={newPlayer.name}
                        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    />
                    <TextField
                        label="Age"
                        fullWidth
                        type="number"
                        value={newPlayer.age}
                        onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                        style={{ marginTop: 10 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: 10 }}
                        onClick={addPlayer}
                    >
                        Add Player
                    </Button>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {players.map((player) => (
                            <Grid item xs={12} sm={6} md={4} key={player._id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{player.name}</Typography>
                                        <Typography>Age: {player.age}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
