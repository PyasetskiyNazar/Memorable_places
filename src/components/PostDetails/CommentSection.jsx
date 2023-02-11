import React, { useState } from 'react'
import useStyles from './style'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {

  const user = JSON.parse(localStorage.getItem('profile'))
  const classes = useStyles();
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(post.comments)
  const dispatch = useDispatch()


  const handleComment = async () => {
    let userName = ''
    if (user && user.result.name) userName = user.result.name
    if (user && user.name) userName = user.name

    const newComments = await dispatch(commentPost(`${userName}: ${comment}`, post._id))
    setComment('');
    if (newComments) {
      setComments(newComments)
    }
  }


  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography variant="h6" gutterBottom >Comments:</Typography>
          {comments && comments.map((comment, index) => (
            <Typography key={index} gutterBottom style={{ marginRight: '5px', boxSizing: 'border-box' }} variant="subtitle1">
              <strong>{comment.split(': ')[0] + ':'}</strong>
              {comment.split(':')[1]}
            </Typography>
          ))}
        </div>
        {((user && user.name) || (user && user.result.name)) && (
          <div style={{ width: '60%' }}>
            <Typography variant="h6" gutterBottom>Write a Comment</Typography>
            <TextField
              fullWidth
              variant="outlined"
              minRows={4}
              multiline
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment}
              variant="contained" color="primary" onClick={handleComment}
            >
              Comment
          </Button>
          </div>
        )}

      </div>

    </div>
  )
}

export default CommentSection
