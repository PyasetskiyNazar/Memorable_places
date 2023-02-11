import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useStyles from './styles'
import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'


const Navbar = (props) => {
  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let time = new Date()

    if (user !== null && user.token_expires_in) {
      time = user.token_expires_in * 1000
      setTimeout(() => {
        logout()
        localStorage.clear()
        setUser(null)
        navigate('/auth')
      }, time)
    }

    if (user !== null && user.token.length > 30) {
      const token = user.token
      if (token) {
        const decodedToken = decode(token)
        if (decodedToken.exp < (new Date().getTime() / 1000)) {
          logout()
          setUser(null)
          localStorage.clear()
          navigate('/auth')
        }
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [navigate, dispatch, location])

  const logout = () => {
    setUser(null)
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const logIn = () => {
    navigate('/auth')
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit" >
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="40" width="40" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.picture}>{user.result ? String(user.result.name).charAt(0) : String(user.name).charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result ? user.result.name : user.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={() => logout()}>LOGOUT</Button>
          </div>
        ) : (
            <Button onClick={() => logIn()} variant="contained" color="primary">Sign In</Button>
          )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
