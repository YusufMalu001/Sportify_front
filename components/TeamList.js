import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const TeamList = ({ teams }) => {
    return (
        <Grid container spacing={2}>
            {teams.map((team) => (
                <Grid item xs={12} sm={6} md={4} key={team._id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{team.name}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default TeamList;
