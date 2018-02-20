import React, { Component } from 'react';
import './Profile.css';
import wallimage from '../images/london.jpg'
import {loadImage} from '../js/main';

class Profile extends Component {
  constructor(props){
    super(props);
    this.css = document.createElement('style');
    this.css.type = 'text/css';
    this.css.innerHTML = ` body {
                        background-color: #ff470f;
                        background-image: linear-gradient(to bottom right, #ff470f, #ac0c7e);
                    }`;
    document.body.appendChild(this.css);
    this.wallcss = document.createElement('style');
    this.wallcss.type = 'text/css';
    this.wallcss.innerHTML = ` .wallpaper {
                        background-image: url(${wallimage});
                    }`;
    document.body.appendChild(this.wallcss);
    this.state = {
      address: "",
      location: null,
      disable: false,
      inputValue: ""
    }
  }

  componentDidMount(){
    loadImage('profile-wallpaper');
  }

  componentWillUnmount(){
    document.body.removeChild(this.css);
    document.body.removeChild(this.wallcss);
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        this.loadLocation(profile);
      });
    } else {
      this.setState({ profile: userProfile });
      this.loadLocation(userProfile);
    }

  }

  updateInputValue(event){
    this.setState({inputValue: event.target.value});
  }

  loadLocation(profile){
    const url = 'http://' + window.location.hostname + ':7000' +
                '/getuserlocation'
    
    const request = new Request(
      url,
      {
        method: 'POST',             
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profile.email
        })
      }
    );

    fetch(request).then(res =>{
      if(res.status === 200){
        return res.json();
      } else {
        window.alert("bad query Location");
      }
    }).then((res) => {
        res = JSON.parse(res);
        this.setState({
          address: res.address,
          location: res.location.location
        });
      }).catch((err)=>this.setState({}));
  }

  register(e){
    e.preventDefault();
    this.setState({disable: true});
    this.queryLocation();
  }

  queryLocation(){
    const loc = this.state.inputValue;

    const url = 'http://' + window.location.hostname + ':4000' +
                '/geoencode?location=' + loc;
    
    const request = new Request(
      encodeURI(url),
      {
        method: 'GET',             
      }
    );

    fetch(request)
    .then((res) => res.json())
    .then(res =>{
      if(res.message){
        return Promise.reject();
      }
      this.registerLocation(res);
    })
    .catch(()=>{
      this.setState({
        disable: false
      });
      window.alert("Invalid Location");
    });
  }

  registerLocation(info){
    info["email"] = this.state.profile.email;
    const url = 'http://' + window.location.hostname + ':7000' +
                '/userlocation'
    
    const request = new Request(
      url,
      {
        method: 'POST',             
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
      }
    );

    fetch(request)
    .then((res) => res.json())
    .then(res =>{
      this.setState({
        disable:false,
        address: res.address,
        location: res.location.location,
        inputValue: ""
      });
    })
    .catch(()=>{
      this.setState({
        disable: false
      });
      window.alert("DB SAVE ERROR");
    });
  }

  render() {
    const { profile } = this.state;
    return (
    <div>
      <div className="wallpaper" id="profile-wallpaper" data-image={wallimage}></div>
      <div className="container">
        <div className="profile-area">
          <div className="columns">
            <div className="column is-1">
            </div>
            <div className="column is-3">
              <img src={profile.picture} className="profile-image" alt="profile" />
            </div>
            <div className="column is-8">
              <h1>{profile.name}</h1>
              <h3>{profile.nickname}</h3>
              <h3>{profile.email}</h3>
            </div>
          </div>
          <div className="columns">
            <div className="column is-1"></div>
            <div className="column is-3">
              <h3>Your current address:</h3>
            </div>
            <div className="column is-8">
              <h3>{this.state.address}</h3>
              <h3>{this.state.location && JSON.stringify(this.state.location)}</h3>
            </div>
          </div>
          <div className="columns">
            <div className="column is-1"></div>
            <div className="column is-8">
              <input className="input" value={this.state.inputValue} onChange={(e)=>this.updateInputValue(e)} type="text" placeholder="Please type in your address"/>
            </div>
            <div className="column is-2">
              <button className="button is-primary" disabled={this.state.disable} onClick={(e)=>this.register(e)}>Register</button>
            </div>
            <div className="column is-1"></div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Profile;
