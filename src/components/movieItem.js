// imported bootstrap
import Card from 'react-bootstrap/Card';
import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';

// include export to import to app.js
export class MovieItem extends React.Component {

    constructor() {
        super();
        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    //delete movie method
    DeleteMovie(e) {
        e.preventDefault();
        Axios.delete('http://localhost:4000/api/movies/'
            + this.props.movie._id)
            .then(() => {
                this.props.ReloadData();
            })
            .catch((err)=>{
                console.log(err);
            });
    }


    render() {
        return (
            <div>
                {/* card code taken from bootstrap */}
                <Card>
                    {/* title */}
                    <h3> <Card.Header>{this.props.movie.title}</Card.Header></h3>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            {/* image */}
                            <img src={this.props.movie.poster} width="200" height="200"></img>

                            <footer className="blockquote-footer">
                                {/* year */}
                                {this.props.movie.year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Button variant="danger"
                        onClick={this.DeleteMovie}>Delete</Button>
                </Card>
            </div>
        );
    }
} 
