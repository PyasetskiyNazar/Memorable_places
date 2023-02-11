import React, { useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { getPostsBySearch } from '../../actions/posts'
import ChipInput from 'material-ui-chip-input'

import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from './styles'
import Paginate from '../Paginate/Paginate'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const query = useQuery()
  const navigate = useNavigate()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')

  const searchPost = () => {
    if (!search.trim() && !tags.length) return null

    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      navigate('/')
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  }

  const handleAddChip = (tag) => setTags([...tags, tag])

  const handleDeleteChip = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

  const clearSearch = () => {
    setSearch('')
    setTags([])
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                value={search}
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip => handleDeleteChip(chip))}
                variant="outlined"
                label="Search Tags"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              <Button onClick={clearSearch} variant="contained" size="small" fullWidth color="secondary">Clear</Button>
            </AppBar>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow >
  )
}

export default Home
