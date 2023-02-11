import React, { useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Container, Paper, Grid, Avatar, Typography, Button } from '@material-ui/core'
import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import useStyles from './styles'
import Input from '../Auth/Input'
import Icon from './Icon'


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {

  const classes = useStyles()
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const errorAuth = useSelector((state) => state.auth.authError)


  const handleShowPassword = () => setShowPassword(!showPassword)

  const switchMode = () => {
    setIsSignup(!isSignup)
    setShowPassword(false)
  }

  const login = useGoogleLogin({
    onSuccess: async res => {
      let user = null
      try {
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              "Authorization": `Bearer ${res.access_token}`
            }
          })
        const { data } = userInfo
        user = data
        user.token = data.sub
        user.token_expires_in = res.expires_in
        dispatch({ type: 'AUTH_ERROR', message: null })
      } catch (error) {
        console.log(error)
      }
      dispatch({ type: 'AUTH', data: user })
      navigate('/')
    },
    onError: error => console.log(error)
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
    dispatch({ type: 'AUTH_ERROR', message: null })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
        {errorAuth ? (<Typography component="h1" variant="h5" color="secondary">{errorAuth}</Typography>) : null}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} className={classes.container}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange}
              type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}
            />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth color="primary" variant="contained" className={classes.submit}>
            {isSignup ? 'Sign up' : 'Sign In'}
          </Button>
          <Button className={classes.googleButton} color="primary" fullWidth onClick={() => login()}
            startIcon={<Icon />} variant="contained">
            Google Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button color="secondary" onClick={() => switchMode()}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an acconut? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
