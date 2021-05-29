import { ThreeSixty } from '@material-ui/icons';
import React, {Component, component} from 'react';
import { Admin } from '../../model/Admin';
import { Hospital } from '../../model/Hospital';
import { HospitalType } from '../../model/HospitalType';
import { HospitalZone } from '../../model/HospitalZone';
import { AdminService } from '../../service/adminservice/AdminService';
import axios from 'axios'
import Select from 'react-select'
class AddAdmin extends Component{
  service = new AdminService();
        state={
        admin:new Admin(),  
        error:{
            firstName:"",
            lastName:"",
            userNAme:"",
            password:""
        }


    };
    validate = () => {
        let flag = true;
        let error = {};
        // if (!this.state.hospital.hospitalId) {
        //   error.idError = "hospital Id Is Required";
        //   flag = false
        // }
        
        if (!this.state.admin.adminFirstName) {
          flag = false;
          error.NameError = "First Name is Required";
        }
    
        // if (!this.state.hospital.hospitalZone) {
        //   flag = false;
        //   error.numberError = "Hospital Zone is Requ.ired";
        // }
    
        // if (!this.state.hospital.hospitalType) {
        //   flag = false;
        //   error.ageError = "Hospital Type is Required";
        // }
    
        if (!this.state.admin.adminLastName) {
          flag = false;
          error.genError = "Last Name is Required";
        }
        this.setState({ error: error })
        return flag;
      };

      handleSubmit = async (event)=>{
          event.preventDefault();
            console.log('hello')
          let isValid = this.validate();
          if(!isValid){
              console.log('hello1')
              return false;
        
          }

          alert(JSON.stringify(this.state.admin));
          this.service.addAdmin(this.state.admin)
          .then((data)=>{
              ThreeSixty.props.history.push("/admins");
          })
          .catch((error)=>{
              alert(JSON.stringify(error))
          });
        }
        render(){
            return(
                <form onSubmit={this.handleSubmit}>

                    <h1>
                    <span className="badge badge-dark">Add Admin</span>
                    </h1>
                    {/* <div className="form-group mr2">
                        <div className="alert-danger">{this.state.error.idError}</div>
                        <input
                        type="text"
                        className="form-control"
                        id="adminId"
                        placeholder="Enter admin Id"
                        value={this.state.admin.adminId}
                        onChange={(event) =>
                        this.setState({admin: { ...this.state.admin, adminId: event.target.value } })
                        }
          />
                        </div>   */}
                        {/* <div className="form-group">
          <div className="alert-danger">{this.state.error.idError}</div>
          <input
            type="text"
            className="form-control"
            id="hospitalId"
            placeholder="Enter Hospital Id"
            value={this.state.hospital.hospitalId}
            onChange={(event) =>
              this.setState({ hospital: { ...this.state.hospital, hospitalId: event.target.value } })
            }
          />
        </div> */}
        <div className="form-group">
          <div className="alert-danger">{this.state.error.fistNameError}</div>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter Admin First Name"
            value={this.state.admin.adminFirstName}
            onChange={(event) =>
              this.setState({ admin: { ...this.state.admin, adminFirstName: event.target.value } })
            }
          />
        </div>
        {/* <div className="form-group">
          <div className="alert-danger">{this.state.error.ZoneError}</div>
          <input
            type="text"
            className="form-control"
            id="hospitalZone"
            placeholder="Enter hospital Zone"
            value={this.state.hospital.hospitalZone}
            onChange={(event) =>
              this.setState({ hospital: { ...this.state.hospital, hospitalZone: event.target.value } })
            }
          />
        </div> */}
        {/* <div className="form-group">
          <div className="alert-danger">{this.state.error.TypeError}</div>
          <input
            type="text"
            className="form-control"
            id="hospitalType"
            placeholder="Enter hospital Type"
            value={this.state.hospital.hospitalType}
            onChange={(event) =>
              this.setState({ hospital: { ...this.state.hospital, hospitalType: event.target.value } })
            }
          />
        </div> */}
        <div className="form-group">
          <div className="alert-danger">{this.state.error.lastNameError}</div>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter Admin Last Name"
            value={this.state.admin.adminLastName}
            onChange={(event) =>
              this.setState({ admin: { ...this.state.admin, adminLastName: event.target.value } })
            }
          />
        </div>
        <div className="form-group">
          <div className="alert-danger">{this.state.error.userNameError}</div>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter UserName"
            value={this.state.admin.adminUserName}
            onChange={(event) =>
              this.setState({ admin: { ...this.state.admin, adminUserName: event.target.value } })
            }
          />
        </div>
        <div className="form-group">
          <div className="alert-danger">{this.state.error.passwordError}</div>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            value={this.state.admin.adminPassword}
            onChange={(event) =>
              this.setState({ admin: { ...this.state.admin, adminPassword: event.target.value } })
            }
          />
        </div>
        
        
        <button type="submit" className="btn btn-primary">
          Add Admin
        </button>
      </form>
      
    );
  }
}
export default AddAdmin;

                