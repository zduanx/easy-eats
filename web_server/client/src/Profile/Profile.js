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
      });
    } else {
      this.setState({ profile: userProfile });
    }
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
        </div>
      </div>
    </div>
    );
  }
}

export default Profile;
