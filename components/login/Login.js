import React, { Component } from 'react'
import { Button,  CssBaseline, FormControl,
   Input, InputLabel, Paper, withStyles} from '@material-ui/core';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn } from './../../actions/loginActions';
import validators from '../common/Validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//matrial ui for login

const styles = theme => ({
   imageCss : {

    height: '100vh'
   },
   
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginRight: 'auto',
      marginLeft: 'auto'
    },
  },
   divStyle: {
      height:'100vh', 
       display: 'flex',
       flexDirection: 'column', 
      justifyContent: `center`
      //backgroundColor: `#1d1818`
   },
  fontSizeCss:{
    fontSize: `14px`,
    color:'#e8f0fe'
  },
  inputCss:{
    width: 'auto',
    border: '1px solid #426381',
    borderRadius: '8px',
    fontSize: `12px`,
  },

  paper: {
    marginTop: `0px` , //theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: `center`,
   
   // backgroundColor: '#4d4d4d',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor:'#35475a',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    cursor:'pointer' 
  },
  label:{
    color:'#e8f0fe'
  },
  input:{
    fontSize:'11px',
    display:'flex',
    borderRadius:5,
    padding:'8px 8px 8px',
    'underline &:before': {
     display:'none !important',
     border:'0 !important'
    },
    'underline &:after': {
      display:'none !important',
      border:'0 !important'
     }
  }
});

 class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
         
            userName: '',
            password: ''
          
           
        }
    }

    
    // on input change
    onInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name] : value
        });

        this.updateValidators(name, value);
    }

/** 
   * This function updates the state of the validator for the specified validator
   */
  updateValidators = (fieldName, value)  => {
    validators[fieldName].errors = [];
    validators[fieldName].state = value;
    validators[fieldName].valid = true;
    validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
        }
      }
    });
  }

  // This function resets all validators for this form to the default state
  resetValidators = () => {
    Object.keys(validators).forEach((fieldName) => {
      validators[fieldName].errors = [];
      validators[fieldName].state = '';
      validators[fieldName].valid = false;
    });
  }

   // This function displays the validation errors for a given input field
   displayValidationErrors = (fieldName) =>{
    const validator = validators[fieldName];
    const result = '';
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return <span className="error" key={index}>{info}</span>;
      });

      return (
        <div className="col s12 row">
          {errors}
        </div>
      );
    }
    return result;
  }

  // This method checks to see if the validity of all validators are true
  isFormValid = () => {
    let status = true;
    Object.keys(validators).forEach((field) => {
      if (!validators[field].valid) {
        status = false;
      }
    });
    return status;
  }
  
    onFormSubmit = (e) =>{
        e.preventDefault();
       // const { userName, password } = this.state;
     
      const formStatus = this.isFormValid();
      if(formStatus){
        this.props.logIn(this.state);
       
      }
      
    }
    
    //renders template
  render() {
        const { userName, password } = this.state;
        const { classes } = this.props;
        if(this.props.authendicated){
          return <Redirect to="/dashboard" />
        }
       

    return (
      <div className={`d-flex align-items-center bg-overlay ${classes.divStyle}`}>
       
     
      <main className={classes.main}>
          <CssBaseline />
      
       <Paper className={classes.paper} style={{    background: '#35475a',
      boxShadow: '8px 8px 8px 8px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
    }}>
      
       <FontAwesomeIcon icon="user-circle" style={{fontSize:'2em', color: '#e8f0fe'}}/>
        
        
        <form className={classes.form}  name="loginForm" onSubmit={(e) => this.onFormSubmit(e)} autoComplete="off">
        <span className="formErrorMsg"> {this.props.loginFailure} </span>
        <FormControl margin="normal" required fullWidth>
        <InputLabel className={classes.fontSizeCss} htmlFor="email">Email</InputLabel>
            <Input style={{'underline &:before': {
     display:'none !important',
     border:'0 !important'
    },'underline  &:after': {
      display:'none !important',
      border:'0 !important'
     }, '&:hover': {
     
      border:'0 !important'
     },
    }} classes={{
        input: classes.input, // class name, e.g. `classes-nesting-root-x`
        label: classes.label, // class name, e.g. `classes-nesting-label-x`
      }} id="email" name="userName" value={userName} onChange={(e) => this.onInputChange(e)} />
       
                <span className="formErrorMsg">{ this.displayValidationErrors('userName') } </span>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
            <InputLabel className={classes.fontSizeCss} htmlFor="password">Password</InputLabel>
            <Input  classes={{
        input: classes.input, // class name, e.g. `classes-nesting-root-x`
        label: classes.label, // class name, e.g. `classes-nesting-label-x`
      }} name="password" type="password" id="password"  value={password} onChange={(e) => this.onInputChange(e)}/>
            <span className="formErrorMsg">{ this.displayValidationErrors('password') } </span>
          </FormControl>
          <Button style={{borderRadius:'25px', width:'50%', margin:`auto`,top: `5px`,display: `flex`,
          justifyContent: `center`,  background: '#35475a',  color:'#e8f0fe'  }}
            type="submit"
            fullWidth
            variant="contained"
            
            className={`${this.isFormValid() ? '' : 'disabled'} ${classes.submit}`}>
            Sign in
          </Button>
        </form>
       </Paper>
       
      </main>
      
       
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loginCredentials : state.loginInfo.loginCredentials,
  authendicated : state.loginInfo.authendicated,
  loginFailure : state.loginInfo.loginFailure
})
const mapDispatchToProps = dispatch => ({
  logIn : (credentials) => dispatch(logIn(credentials))
})
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));