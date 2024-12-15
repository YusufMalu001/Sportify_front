import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button, Grid, Card, CardContent, TextField, CircularProgress } from "@mui/material";

export default function Players() {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState({ name: "", age: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch players from the backend
    const fetchPlayers = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/players");
            setPlayers(res.data);
        } catch (err) {
            setError("There was an error fetching players.");
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new player
    const addPlayer = async () => {
        if (!newPlayer.name || !newPlayer.age) {
            setError("Name and Age are required!");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/players", newPlayer);
            setNewPlayer({ name: "", age: "" }); // Reset the form after adding
            fetchPlayers(); // Refresh the player list
        } catch (err) {
            setError("There was an error adding the player.");
            console.error(err.message);
        } finally {
            setLoading(false);
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

            {error && <Typography color="error">{error}</Typography>}

            <Grid container spacing={2}>
                {/* Player Form */}
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={newPlayer.name}
                        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                        required
                    />
                    <TextField
                        label="Age"
                        fullWidth
                        type="number"
                        value={newPlayer.age}
                        onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                        style={{ marginTop: 10 }}
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: 10 }}
                        onClick={addPlayer}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Add Player"}
                    </Button>
                </Grid>

                {/* Player List */}
                <Grid item xs={12} md={8}>
                    {loading ? (
                        <CircularProgress />
                    ) : (
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
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

