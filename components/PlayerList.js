import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const PlayerList = ({ players }) => {
    return (
        <Grid container spacing={2}>
            {players.map((player) => (
                <Grid item xs={12} sm={6} md={4} key={player._id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{player.name}</Typography>
                            <Typography>Age: {player.age}</Typography>
                            <Typography>Team: {player.team ? player.team.name : 'N/A'}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default PlayerList;
