import React, { Component } from 'react';
import './RestaurantPage.css';
import wallimage from '../images/tokyo.jpg'
import loading from '../images/loading.svg';
import {loadImage} from '../js/main';
import Nomatch from '../Nomatch/Nomatch';
class RestaurantPage extends Component {
  constructor(props){
    super(props);
    this.css = document.createElement('style');
    this.css.type = 'text/css';
    this.css.innerHTML = ` body {
                      background-color: #151425;
                      background-image: none;
                    }`;
    document.body.appendChild(this.css);
    this.wallcss = document.createElement('style');
    this.wallcss.type = 'text/css';
    this.wallcss.innerHTML = ` .wallpaper {
                        background-image: url(${wallimage});
                    }`;
    document.body.appendChild(this.wallcss);

    this.state = {
      info: null,
      fetching: true,
      isRender: true
    }
  }
  
  componentDidMount(){
    loadImage('profile-wallpaper');

    this.loadRestuarantInfo();

    // for testing
    // setTimeout(()=>{
    //   console.log(12312);
    //   this.setState({isRender: false, fetching: false})
    // }, 3000);
  }

  loadRestuarantInfo(){
    const name = this.props.match.params.name;
    const url = 'http://' + window.location.hostname + ':5000' +
                '/restaurants/' + name;
    const request = new Request(
      url,
      {
        method: 'GET',
      }
    );

    console.log();
    fetch(request)
      .then((res) => {
        if(res.ok){
          this.setState({
            info: res.json(),
            fetching: false
          });
        }else{
          return new Promise.reject();
        }
      })
      .catch(()=>this.setState({
        isRender: false,
        fetching: false
      }));
  }

  componentWillUnmount(){
    document.body.removeChild(this.css);
    document.body.removeChild(this.wallcss);
  }

  render() {
    return (
    <div>
      <div className="wallpaper" id="profile-wallpaper" data-image={wallimage}></div>
      <div className="container">
        {this.state.fetching && <div className= "rest-display" ><img src={loading} alt="loading"/></div>}
        {!this.state.fetching && !this.state.isRender && <div className="rest-display"><Nomatch /></div>}
        {!this.state.fetching && this.state.isRender && 
          <h1>{this.props.match.params.name} </h1>
        }
      </div>
    </div>
    );
  }
}

export default RestaurantPage;
