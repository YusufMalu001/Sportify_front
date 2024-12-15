import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const TeamForm = ({ onAddTeam }) => {
    const [team, setTeam] = useState({ name: "" });

    const handleChange = (e) => {
        setTeam({ ...team, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/teams", team);
            onAddTeam(); // To refresh team list
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <TextField
                label="Team Name"
                variant="outlined"
                name="name"
                value={team.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
                Add Team
            </Button>
        </Box>
    );
};

export default TeamForm;
