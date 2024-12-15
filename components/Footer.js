import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Footer = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: "#1976d2", padding: "1rem 0" }}>
            <Container>
                <Typography variant="body1" color="white" align="center">
                    &copy; 2024 Sportify. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
