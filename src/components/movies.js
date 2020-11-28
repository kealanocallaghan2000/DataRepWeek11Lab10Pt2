// import react
import React from 'react';
import { MovieItem } from './movieItem';


// include export to import to app.js
export class Movies extends React.Component {

    //render method
    render() {
        //passing in new "movie" item
        return this.props.movies.map((movie) => {
            //making a component for each seperate movie
            return <MovieItem movie={movie} ReloadData={this.props.ReloadData}></MovieItem>
        })
    }
} 
