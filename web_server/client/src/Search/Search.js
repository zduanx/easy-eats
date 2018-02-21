import React, { Component } from 'react';
import './Search.css';
import wallimage from '../images/chicago.jpg';
import {loadImage} from '../js/main';
import { Link } from 'react-router-dom';
import loading from '../images/loading.svg';
import RestuarantCard from '../RestuarantCard/RestuarantCard';

class Profile extends Component {
  constructor(props){
    super(props);
    this.css = document.createElement('style');
    this.css.type = 'text/css';
    this.css.innerHTML = ` body {  
      background-color: #00bcf1;
      background-image: linear-gradient(to bottom right, #00bcf1, #180CAC);
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
      inputValue: "",
      searchValue: "",
      disable: false,
      distance: 0,
      number: 0,
      found: 0,
      loading: false,
      fetched: false,
      info: null,
    }
  }

  componentDidMount(){
    loadImage('search-wallpaper');
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

  updateInputValue(event){
    this.setState({inputValue: event.target.value});
    if(event.target.value <0 || event.target.value > 25){
      window.alert("please enter integer (1-25)");
      this.setState({inputValue: ""});
    }
  }

  updateSearchValue(event){
    this.setState({searchValue: event.target.value});
  }

  handleSelection(event){
    console.log(this.state.inputValue);
    const distance = this.state.inputValue;
    this.setState({distance: distance});
    if(!this.state.inputValue || this.state.inputValue === "0"){
      window.alert("please enter integer (1-25)");
      this.setState({inputValue: ""});
      return
    }
    this.setState({disable: true, loading: true, info: null});
    this.preloadDatabase(distance);
  }

  sendSearchValue(event){
    if(event.key === 'Enter'){
      this.handleSearchValue(this.state.searchValue);
    }
  }

  handleSearchValue(value){
    this.setState({loading: true, disable: true});
    const url = 'http://' + window.location.hostname + ':4000' +
                '/search'
    
    const request = new Request(
      url,
      {
        method: 'POST',             
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.profile.email,
          value: value
        })
      }
    );

    fetch(request).then(res =>{
      if(res.status === 200){
        return res.json();
      } else {
        window.alert("bad query Location");
        this.setState({loading: false, disable: false, info: null});
        return
      }
    }).then((res) => {
      console.log(res);
        this.setState({
          loading: false,
          disable: false,
          info: res.info,
          found: res.found
        });
      }).catch((err)=>this.setState({loading: false, disable: false, info: null}));

  }


  preloadDatabase(distance){
    const url = 'http://' + window.location.hostname + ':4000' +
                '/preload'
    
    const request = new Request(
      url,
      {
        method: 'POST',             
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.profile.email,
          lang: this.state.location.lng,
          lat: this.state.location.lat,
          distance: distance
        })
      }
    );

    fetch(request).then(res =>{
      if(res.status === 200){
        return res.json();
      } else {
        window.alert("bad query Location");
        this.setState({loading: false, disable: false});
        return
      }
    }).then((res) => {
        this.setState({
          loading: false,
          disable: false,
          number: res.number,
          fetched: true,
        });
      }).catch((err)=>this.setState({loading: false, disable: false}));
  }

  renderInfo(){
    const obj = this.state.info;
    const info_list = obj.map(info => {
      return(
          <div className = "column is-6">
            <RestuarantCard key={Math.random()} info={info} />
          </div>
      );
    });

    const retval = [];
    for(let i = 0; i < obj.length/2; i++){
      retval.push(<div className="columns">{info_list[2*i]} {info_list[2*i+1]} </div>);
    }
    if(obj.length % 2 === 1){
      retval.push(<div className="columns">{info_list[obj.length-1]}</div>);
    }

    return retval;
  }

  render() {
    const { profile } = this.state;
    // const test = "{\"name\":\"Shanghai Cafe\",\"rating\":\"3.0 star rating\",\"count\":\"183 reviews\",\"phone\":\"(858) 452-6888\",\"image\":\"https://s3-media2.fl.yelpcdn.com/bphoto/3uFx5Hzt9ZJNeVMLTpUAAg/ls.jpg\",\"identifier\":\"/biz/shanghai-cafe-san-diego\",\"keywords\":[\"Chinese\"],\"matching\":\"Shanghai Cafe Chinese\",\"confidence\":0.5454545454545454}"
    // const to = JSON.parse(test);
    return (
    <div>
      <div className="wallpaper" id="search-wallpaper" data-image={wallimage}></div>
      <div className="container">
      <div className="search-header">
        <div className = "columns ">
          <div className = "column">
            <h1>Welcome {profile.name}</h1>
          </div>
        </div>

        
        {this.state.address && 
        <div className = "columns is-centered">
          <div className = "column">
          <h3> {this.state.address} {this.state.location && JSON.stringify(this.state.location)} &nbsp;&nbsp;</h3>
          <Link to="/profile" className="button is-primary"> change</Link>
          </div>
        </div>
        }
        {!this.state.address && 
        <div className = "columns is-centered">
          <div className = "column">
            <Link to="/profile" className="button is-primary"> Please register your address first!</Link>   
          </div>
        </div>
        }
        {this.state.address && 
        <div className = "columns is-centered">
          <div className = "column ">
            <h3> Please type in the Range in miles: &nbsp;&nbsp; </h3> 
            <input className="input" value={this.state.inputValue} onChange={(e)=>this.updateInputValue(e)} step="0.5" min="0.5" max="25" type="number" placeholder="distance in miles (1-25)mi"/>
            <button className="button is-danger distance" disabled={this.state.disable} onClick={(e)=>this.handleSelection(e)}>GO</button>
          </div>
        </div>
        }

        {this.state.fetched && this.state.number != 0 && 
        <div className = "columns is-centered">
          <div className = "column ">
            <a className="button is-static">Search</a>
            <input id="searchinput" className="input" onKeyPress={(e)=>this.sendSearchValue(e)} value={this.state.searchValue} onChange={(e)=>this.updateSearchValue(e)} type="text" placeholder="Please type in your search keyword"/>
          </div>
        </div>
        }

        {this.state.fetched &&
        <div className = "columns is-centered">
          <div className = "column ">
            <h3>Total <strong>{this.state.number} </strong> restaurants loaded for search</h3> 
          </div>
        </div>
        }

        
        {this.state.loading &&
        <div className = "columns is-centered">
          <div className = "column ">
             <img src={loading} alt="loading"/>
          </div>
        </div>
        }

      </div>
      <div>

        {this.state.info &&
          this.renderInfo()        
        }

      <div className="search-header">
        {this.state.fetched &&
        <div className = "columns is-centered">
          <div className = "column ">
            <h3>Total <strong>{this.state.found} </strong> restaurants found</h3> 
          </div>
        </div>
        }

      </div>
      </div>
      </div>
    </div>
    );
  }
}

export default Profile;
