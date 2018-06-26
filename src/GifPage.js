import React, { Component } from 'react';

class GifPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gif: {}
        }
    }

    componentWillMount() {
        //let url = "https://api.giphy.com/v1/gifs/" + 
           // this.props.match.params.gifID + "?api_key=piiGSxEBKJuMefFyyaD1Mee6GoyN7AJB";
            let url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=info|description&format=json&formatversion=2&pageids=" + 
            this.props.match.params.pageid;

           
        return fetch(url, {mode: 'cors'})
        .then((response) => {
            return response.json()
        }).then((response) => {
            this.setState({
                gif: response.query.pages[0]
            })
        });
    }

    render () {
        let query= null;
        if (this.state.gif) {
        query = (
            <div className=" gif-border col-12 col-sm-10 col-md-10 col-lg-10 offset-lg-1">   
                <div className="gif-container">
                      <div>
                         <p className="text-center big">{this.state.gif.title}</p>
                         <p className="text-center text-description">-{this.state.gif.description}</p>
                           {/* <img src={this.state.gif.images.downsized.url} className="gif"/> */}
                      </div>
                </div>
            </div>
           
            );
        }
        return (
            <div>
                {query}
            </div>
        )
    }
}

export default GifPage;