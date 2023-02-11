import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'
import { useNavigate } from 'react-router-dom'

const Form = ({ currentId, setCurrentId }) => {

  const dispatch = useDispatch()
  const classes = useStyles()
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('profile')))
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })

  const navigate = useNavigate()
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (post) setPostData(post)
    if (user) setUserData(JSON.parse(localStorage.getItem('profile')))
  }, [post])

  useEffect(() => {
    if (user) setUserData(JSON.parse(localStorage.getItem('profile')))
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user.result ? user.result.name : user.name }, navigate))
    } else {
      if (postData.title && postData.message && postData.tags) {
        dispatch(createPost({ ...postData, name: user.result ? user.result.name : user.name }, navigate))
      }
    }
    clear()
  }
  const clear = () => {
    setCurrentId(null)
    setPostData({ title: '', message: '', tags: '', selectedFile: '' })
  }

  if (!userData) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories posts
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField required name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField required name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField required name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={() => clear()} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form
