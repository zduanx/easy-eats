import React, { Component } from 'react';
import './Index.css';
import './Index-animation.css';
import food from '../images/food.jpg';
import wallimage from '../images/austria.jpg';
import {loadImage} from '../js/main';

class Index extends Component {
  constructor(props){
    super(props);
    this.css = document.createElement('style');
    this.css.type = 'text/css';
    this.css.innerHTML = ` body {
                        background-color: #5f45bb;
                        background-image: linear-gradient(to bottom right, #180cac, #d054e4);
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
    loadImage('pictureImage', 'picture');
    loadImage('index-wallpaper');
  }

  login() {
    this.props.auth.login();
  }

  componentWillUnmount(){
    document.body.removeChild(this.css);
    document.body.removeChild(this.wallcss);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <div className="wallpaper" id="index-wallpaper" data-image={wallimage}></div>
        <div className="container">
        <div className="content-index">
          <aside className="side">
            <div id="picture" className="picture">
            <div className="picture-shadow"></div>
            <img id="pictureImage" className="picture-image"
               src={food}
               alt="food"
               width="320"
               height="320"/>
            </div>
          </aside>
          <main className="about">
            <h1 className="name">
              This is Easy Eats
            </h1>
            <p className="job">
              Food Recommendation Solution
            </p>
            <hr id="hr"/>
            <div className="description">
              <p>
                No idea?<br/>
                No clue?<br/>
                No Problem ...<br/>
              </p>
            </div>
            { !isAuthenticated() && 
            <div className="contact">
              <button className="button-index" onClick={()=>this.login()}>
                Sign in
              </button>
            </div>
            }
          </main>
        </div>
        </div>
      </div>
    );
  }
}

export default Index;