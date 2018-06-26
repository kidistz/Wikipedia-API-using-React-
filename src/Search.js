import React, { Component } from 'react';
import './css/Search.css';
import { Link, Route, Switch } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: []
    }

    this.onResult = this.onResult.bind(this);
  }

  onResult(gifs, searchQuery) {
    this.props.history.push('/search/' + searchQuery);
    this.setState({
      gifs: gifs
    });
  }

  render() {
    return (
      <div>
        <Form onResult={this.onResult} search={this.props.match.params.search} />
        <Results gifs={this.state.gifs} />
      </div>
    )
  }
}


class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: this.props.search
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchQuery: event.target.value});
  }

  componentWillMount() {
    if (!!this.state.searchQuery) {
      //let url = "https://api.giphy.com/v1/gifs/search?api_key=piiGSxEBKJuMefFyyaD1Mee6GoyN7AJB&q=" + this.state.searchQuery;
      let url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=" + this.state.searchQuery;
      return fetch(url, {mode: 'cors'})
      .then((response) => {
          return response.json()
      }).then((response) => {
        this.props.onResult(response.query.search, this.state.searchQuery);
      });

    }
  }

  handleSubmit(event) {
    event.preventDefault();
   //let url = "https://api.giphy.com/v1/gifs/search?api_key=piiGSxEBKJuMefFyyaD1Mee6GoyN7AJB&q=" + this.state.searchQuery;
   let url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=" + this.state.searchQuery;
    return fetch(url, {mode: 'cors'})
    .then((response) => {
        return response.json()
    }).then((response) => {
      this.props.onResult(response.query.search, this.state.searchQuery);
    });
  }


  render() {
    return (
      <div className="container">
          <div className="row">            

              <div className="col-lg-10 offset-lg-1">
              <div className="logo">
                  <h1 class="logo-center">W</h1>    
                 </div>                  
                  <form onSubmit={this.handleSubmit} className="search-form needs-validation" name="search-form" noValidate>
                      <div className="form-row">
                          <div className="col-sm-12">
                             <div className="input-group">
                               <div className=" style={styles} input-group-prepend ">
                                  <span className="input-group-text oval-left " id="inputGroupPrepend3">                               
                                     <i className="fa fa-search"></i>
                                  </span>
                               </div>
                            
                                <input type="text"  style={{borderBottomRightRadius: '30px', borderTopRightRadius: '30px', borderColor:'white'}}  onChange={this.handleChange} 
                                    className="form-control oval-right search-input" value={this.state.searchQuery}  name="search" placeholder="Search..." required/>
                                 <div className="invalid-feedback">
                                     Please enter a search query.
                                 </div>
                             </div>
                            </div>
                          {/* <div className="col-sm-2">
                              <button type="submit" id="search" className="btn btn-primary">Search</button>
                          </div> */}
                      </div>
                  </form>
              </div>
          </div>
      </div>
    )
  }

}


class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        {this.props.gifs.map(gif => <Gif obj={gif} key={gif.pageid} />)}
      </div>
    )
  }
}

class Gif extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className=" gif-border col-12 col-sm-10 col-md-10 col-lg-10 offset-lg-1">
         <div className="gif-container">
             {/* <Link to={"/gifs/" + this.props.obj.id}> */}
             <Link to={"/gifs/" + this.props.obj.pageid}>
             {/* //<img src={this.props.obj.images.downsized.url} className="gif"/> */}
             <p className="text-center">{this.props.obj.title}</p>
              
           
             <p  dangerouslySetInnerHTML={{ __html: this.props.obj.snippet }} className="text-center"></p>
           </Link>
          </div>
      </div>  
    )
  } 
}

export default Search;
