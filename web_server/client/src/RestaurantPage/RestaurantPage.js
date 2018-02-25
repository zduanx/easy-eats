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
      isRender: true,
      footprint: 0
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
    const url = 'http://' + window.location.hostname + ':4200' +
                '/restaurants/' + name;
    const request = new Request(
      url,
      {
        method: 'GET',
      }
    );

    fetch(request)
      .then((res) => res.json())
      .then( info =>{
        this.setState({
          info: JSON.parse(info),
          fetching: false
        });
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
    const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const { isAuthenticated } = this.props.auth;
    return (
    <div>
      <div className="wallpaper" id="profile-wallpaper" data-image={wallimage}></div>
      <div className="container">
        {this.state.fetching && <div className= "rest-display" ><img src={loading} alt="loading"/></div>}
        {!this.state.fetching && !this.state.isRender && <div className="rest-display"><Nomatch /></div>}
        {!this.state.fetching && this.state.isRender && 
          <div className="rest-content">
            <div className="columns">
              <div className="column is-3 ">
                <img src={this.state.info.image} className="food-img" alt="food" />
              </div>
              <div className="column is-9">
                <h1> {this.state.info.name}</h1>
                <div className="columns ">
                  <div className="column is-4">
                    <h3> {this.state.info.rating}</h3>
                    <h3> {this.state.info.count}</h3>
                  </div>
                  <div className="column is-4">
                    <h3> {this.state.info.website}</h3>
                    <h3> {this.state.info.phone}</h3>
                    {this.state.info.address.map((val)=> (<h3 key={Math.random()}> {val}</h3>))}
                    <a className="button is-danger yelp-button" href={this.state.info.url} target="_blank"><i className="fab fa-yelp"/>Yelp</a>
                  </div>
                  <div className="column is-4">
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-7">
                <h2> Review Highlights</h2>
                {this.state.info.reviews && this.state.info.reviews.map((val)=> (<div key={Math.random()}><h3 className="yelp-review"> {val}</h3><hr/></div>))}
              </div>
              <div className="column is-1"></div>
              <div className="column is-4">

                {isAuthenticated() && 
                  <div>
                    <h3>You were here</h3> <h3><span className="rest-visit">{this.state.footprint}</span></h3> <h3> times!</h3>
                    <br/>
                    <button className="button is-primary">Ate Here Before!</button>
                    <br/>
                    <br/>
                  </div>
                }
                <h2> Generics </h2>
                  {this.state.info.keywords.map((val)=> (<h3 key={Math.random()}> {val}</h3>))}
                <br/>
                {this.state.info.hours && 
                  <div>
                <h2> Hours </h2>
                <table className="table">
                <tbody>
                  {day.map((val, ind)=> (<tr key={ind}><td> {val}</td><td>{this.state.info.hours[ind]}</td></tr>))}
                </tbody>
                </table>
                </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
    );
  }
}

export default RestaurantPage;
