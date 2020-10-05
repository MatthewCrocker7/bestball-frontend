import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory } from "react-router-dom";
import api from '../utils/api';
import HttpService from '../utils/HttpService';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                BB.golf
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



const Register = () => {
    const classes = useStyles();
    const history = useHistory();
    const [formData, updateFormData] = React.useState({});
    const [emailError, updateEmailError] = React.useState();
    const [userError, updateUserError] = React.useState();
    const [passwordError, updatePasswordError] = React.useState();
    const [confirmPasswordError, updateConfirmPasswordError] = React.useState();

    const handleChange = (e) => {
        const newData = Object.assign({}, formData);
        newData[e.target.id] = e.target.value;
        updateFormData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        HttpService.register(api.register, formData, handleSuccess, handleError);
    };

    const handleSuccess = (data, status) => {
        console.log('Registration success!');

        history.push("/login");
    };

    const handleError = (error) => {
        console.log('Bad: ', error.response);
        if (error.response.data.exceptions) {
            checkErrors(error.response.data.exceptions);
        } else {
            console.log('Unknown error found.');
        }
    };

    const checkErrors = (errors) => {
        if (errors.email) {
            updateEmailError(errors.email.message);
        }
        if (errors.userName) {
            updateUserError(errors.userName.message);
        }
        if (errors.password) {
            updatePasswordError(errors.password.message);
        }
        if (errors.confirmPassword) {
            updateConfirmPasswordError(errors.confirmPassword.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onChange={handleChange} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="h5" variant="subtitle2" align="center">
                                Your username is how other players will identify you.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="Username"
                                name="userName"
                                autoComplete="username"
                            />
                        </Grid>
                        {userError &&
                            <Grid item xs={12}>
                                <Typography component="h5" variant="subtitle2" align="center" color="error">
                                    {userError}
                                </Typography>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        {emailError &&
                            <Grid item xs={12}>
                                <Typography component="h5" variant="subtitle2" align="center" color="error">
                                    {emailError}
                                </Typography>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        {passwordError &&
                        <Grid item xs={12}>
                            <Typography component="h5" variant="subtitle2" align="center" color="error">
                                {passwordError}
                            </Typography>
                        </Grid>
                        }
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                            />
                        </Grid>
                        {confirmPasswordError &&
                        <Grid item xs={12}>
                            <Typography component="h5" variant="subtitle2" align="center" color="error">
                                {confirmPasswordError}
                            </Typography>
                        </Grid>
                        }
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default Register;
