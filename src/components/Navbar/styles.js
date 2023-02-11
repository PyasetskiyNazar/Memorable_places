import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors'

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem'
    },
  },
  image: {
    marginLeft: '15px',
    [theme.breakpoints.down('sm')]: {
      width: '20px',
      height: '20px'
    },
  },
  logout: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '300px'
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '300px'
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    },
  },
}));