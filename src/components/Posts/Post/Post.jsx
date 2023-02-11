import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost, likePost } from '../../../actions/posts';

const defaultImage = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'

const Post = ({ setCurrentId, post }) => {

  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const classes = useStyles()
  const [userId, setUserId] = useState(user ? (user.sub || user.result._id) : null)
  const navigate = useNavigate()
  const [likes, setLikes] = useState(post.likes)

  const hasLikedPost = likes.find((like) => like === userId)

  const Likes = ({ userId }) => {
    return hasLikedPost ? (
      <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length}&nbsp;{likes.length > 1 ? 'Likes' : 'Like'}</>
    ) : (
        <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length}&nbsp;{likes.length > 1 ? 'Likes' : 'Like'}</>
      )
  }

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }

  const handleLike = () => {
    dispatch(likePost(post._id))
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId))
    } else {
      setLikes([...post.likes, userId])
    }
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      {userId === post.creator ? (<div className={classes.overlay2}>
        <Button style={{ color: 'white', zIndex: '2000' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
      </div>) : null}
      <ButtonBase component="span" className={classes.cardAction} onClick={openPost} >
        <CardMedia className={classes.media} title={post.title}
          image={post.selectedFile || defaultImage} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags && post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardButtons}>
        <Button size="small" color="primary" disabled={!user} onClick={handleLike}>
          <Likes userId={userId} />
        </Button>
        {userId === post.creator ? (<Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>) : null}
      </CardActions>
    </Card>
  )
}

export default Post