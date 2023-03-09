import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="/">
//                 Brett
//             </Link>{' '}
//             {new Date().getFullYear()}
          
//         </Typography>
//     );
// }

const theme = createTheme();

export default function SignUpPage() {
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const first_name = e.target.first_name.value;
        const last_name = e.target.last_name.value;
        const Address = e.target.Address.value;
        const Zip_code = e.target.Zip_code.value;
        const City = e.target.City.value;
        const State = e.target.State.value;
        const phone_number = e.target.phone_number.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;


        const reqBody = {
            first_name: first_name,
            last_name: last_name,
            Address: Address,
            Zip_code: Zip_code,
            City: City,
            State: State,
            phone_number: phone_number,
            email: email,
            password: password
        }

        const url = 'http://localhost:5000/api/signup'
        const options = {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": 'application/json'
            }
        }
        if (password !== confirmPassword) {
            console.log('Password dont match')
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            setRedirect(true)
        }
    };

    return redirect ? <Navigate to='/Login' /> :
        (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        sx={{
                             border: '10px solid',
                            borderColor: 'grey.300',
                            borderRadius: '4px',
                            padding: '20px',
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',

                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="first_name"
                                        required
                                        fullWidth
                                        id="first_name"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="last_name"
                                        label="Last Name"
                                        name="last_name"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="Address"
                                        label="Address"
                                        name="Address"
                                        autoComplete="Address"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="Zip_code"
                                        label="Zip Code"
                                        name="Zip_code"
                                        autoComplete="Zip_code"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="City"
                                        label="City"
                                        name="City"
                                        autoComplete="City"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="State"
                                        label="State"
                                        name="State"
                                        autoComplete="State"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone_number"
                                        label="Phone Number"
                                        name="phone_number"
                                        autoComplete="phone_number"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="confirmPassword"
                                        id="confirmPassword"
                                        autoComplete="confirm-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Link href="/Login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright fontWeight="bold" sx={{ mt: 5 }} /> */}
                </Container>
            </ThemeProvider>
        );
}