// import react
import React  from 'react';
import { Movies } from './movies';
import axios from 'axios';


// include export to import to app.js
export class Read extends React.Component{

    //object that handles the data for our components
    state = {
        //json data for movies
        movies: []
    };


    //axios pulls json data from the link instead of hardcoding data
    componentDidMount(){
        axios.get('http://localhost:4000/api/movies')    
        .then(response =>{
            this.setState({movies: response.data.movies})
        })
        //catch for when an error occurs
        .catch(
            (error)=>{
                console.log(error);
            }    
        );
    }

    //visual piece of the component
    render(){
        return(
            <div>
                <h1>This is the read component</h1>
                {/* embedded from movies component */}
                <Movies movies = {this.state.movies}></Movies>
            </div>
        );
    }
} 
