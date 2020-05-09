import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/logo.png';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 0px auto',
    width: '60px',
    height: '60px',
  },
  pageTitle: {
    margin: '20px auto 20px auto',
  },
  TextField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  progress: {
    position: 'absolute'
  }
}
export class login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="icon" className={classes.image} />
          <Typography variant="h3" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id="email" name="email" type="email" label="Email" className={classes.TextField} value={this.state.email} onChange={this.handleChange} fullWidth helperText={errors.email} error={errors.email ? true : false} />
            <TextField id="password" name="password" type="password" label="Password" className={classes.TextField} value={this.state.password} onChange={this.handleChange} fullWidth helperText={errors.password} error={errors.password ? true : false} />
            <Button type="submit" variant="contained" color="primary" disabled={loading} className={classes.button}>Login {loading && (<CircularProgress size={30} className={classes.progress} />)}</Button>
            <br />
            <small>Dont have an account? Signup <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
