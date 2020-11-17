// imported bootstrap
import Card from 'react-bootstrap/Card';
import React from 'react';


// include export to import to app.js
export class MovieItem extends React.Component {

    render() {
        return (
            <div>
                {/* card code taken from bootstrap */}
                <Card>
                    {/* title */}
                    <Card.Header>{this.props.movie.title}</Card.Header>
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
                </Card>

            </div>
        );
    }
} 
