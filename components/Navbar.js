import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container>
                    <Typography variant="h6" color="inherit">
                        Sportify
                    </Typography>
                    <div style={{ marginLeft: 'auto' }}>
                        <Button color="inherit" component={Link} href="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} href="/players">
                            Players
                        </Button>
                        <Button color="inherit" component={Link} href="/teams">
                            Teams
                        </Button>
                        <Button color="inherit" component={Link} href="/tournaments">
                            Tournaments
                        </Button>
                        <Button color="inherit" component={Link} href="/matches">
                            Matches
                        </Button>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
