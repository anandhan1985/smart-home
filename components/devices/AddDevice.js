import React, { Component } from 'react'
import { newDevice } from '../../actions/dashboardActions';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import {
  Button, FormControl,
  Input, InputLabel, Typography
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
const styles = theme => ({
})
class AddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      macAddress: '',
      deviceName: '',
      deviceLocation: '',
      showErrMag: false,
      open: this.props.openDialog
    }
  }
  componentDidMount() {
    console.log(this.props.openDialog)
  }
  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  addNewDevice = (e) => {
    if (this.state.macAddress !== '' && this.state.deviceName !== '' && this.state.deviceLocation !== '') {
      console.log(this.state)
      this.props.callParentFunc()
      this.props.newDevice(this.state);
    }
    else {
      this.setState({
        showErrMag: true
      })
    }
  }
  cancelAddDevice = () => {
    this.setState({
      showErrMag: false
    })
    this.props.cancelAddDevice()
  }
  render() {
    const { macAddress, deviceName, deviceLocation, showErrMag } = this.state;
    return (
      <div>
        <form>
          <Dialog
            open={this.props.openDialog}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Device 
            <Tooltip title="Add" aria-label="Add">
                    <Fab 
                      style={{
                        width: '35px', height: '35px', marginLeft: '1em',
                        background: "#21638a", position: 'relative', top: '-8px'
                      }}>
                      <AddIcon />
                    </Fab>
                  </Tooltip>
            </DialogTitle>
            <DialogContent>
              <Typography style={showErrMag ? { display: 'flex', marginLeft: '1em' } : { display: 'none' }} gutterBottom variant="h6" component="h5">
                <br /> Please fill out empty fields !!!
                  </Typography>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="MAC Address">MAC Address</InputLabel>
                <Input id="macAddress" type="text" name="macAddress" value={macAddress} onChange={(e) => this.onInputChange(e)} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="Device Name">Device Name</InputLabel>
                <Input name="deviceName" type="text" id="deviceName" value={deviceName} onChange={(e) => this.onInputChange(e)} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="Device Location">Device Location</InputLabel>
                <Input name="deviceLocation" type="text" id="deviceLocation" value={deviceLocation} onChange={(e) => this.onInputChange(e)} />
              </FormControl>
            </DialogContent>
            <DialogActions style={{ display: `flex`, flexDirection: 'row', justifyContent: `center`, }}>
              <Button style={{
                borderRadius: '25px', width: '30%', margin: `auto`, top: `5px`, display: `flex`,
                justifyContent: `center`, background: '#35475a', color: '#e8f0fe'
              }} type="submit" fullWidth variant="contained" onClick={(e) => this.addNewDevice(e)}>
                Add
          </Button>
              <Button style={{
                borderRadius: '25px', width: '30%', margin: `auto`, top: `5px`, display: `flex`,
                justifyContent: `center`, background: '#35475a', color: '#e8f0fe'
              }} type="submit" fullWidth variant="contained" onClick={this.cancelAddDevice}>
                Cancel
          </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    devicesData: state.dashboardData.devicesData,
    deviceTypes: state.dashboardData.deviceTypes,
    newDevice: state.dashboardData.newDevice
  }
}
const mapDispatchToprops = (dispatch) => {
  return {
    newDevice: (data) => {
      dispatch(newDevice(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToprops)(withStyles(styles, { withTheme: true })(AddDevice));