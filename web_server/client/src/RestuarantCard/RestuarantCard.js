import './RestuarantCard.css';
import React from 'react';

class RestuarantCard extends React.Component {
    redirectToUrl(url, event){
        event.preventDefault();
        this.sendClickLog();
        const newurl =  window.location.origin + '/restaurants/' + url.replace("/biz/", "");
        window.open(newurl, '_blank');
    }

    sendClickLog(){}

    render() {
        return(
            <div className="info-container box" onClick={(event) =>  this.redirectToUrl(this.props.info.identifier, event)}>
                <div className='columns'>
                    <div className='column is-4'>
                        <img className="image" src={this.props.info.image} alt='info' />
                    </div>
                    <div className="column is-8">
                        <div className='columns is-mobile'>
                            <div className='column is-6'>
                                <h3>{this.props.info.name}</h3>
                                <h3>{this.props.info.phone}</h3>
                                <h3>{this.props.info.rating}</h3>
                                <h3>{this.props.info.count}</h3>
                            </div>
                            <div className="column is-6">
                                {this.props.info.keywords && this.props.info.keywords.map((val)=> (<h3 key={Math.random()}> {val}</h3>))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default RestuarantCard;