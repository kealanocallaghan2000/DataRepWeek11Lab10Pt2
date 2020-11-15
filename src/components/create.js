// import react
import React from 'react';
//import axios http client
import axios from 'axios';



// include export to import to app.js
export class Create extends React.Component {

    constructor() {
        super();
        //binding for the year, name and poster
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeMovieName = this.onChangeMovieName.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);

        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }

    //method for when values are changed
    onChangeMovieName(e) {
        this.setState({ Title: e.target.value })
    }

    onChangeMovieYear(e) {
        this.setState({ Year: e.target.value })
    }

    onChangeMoviePoster(e) {
        this.setState({ Poster: e.target.value })
    }

    //method from when text is submitted
    onSubmit() {
        alert('Movie added - Title: '
            + this.state.Title + ' Year: '
            + this.state.Year + ' Poster: '
            + this.state.Poster);

        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster
        }

            //post request to url
            
            axios.post('http://localhost:4000/api/movies', newMovie)
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            });
        }

    render() {
        return (
            //UI
            <div>
                <h1>This is the Create component</h1>
                <form onSubmit={this.onSubmit}>
                    {/* Name */}
                    <div className="form/group">
                        <label>Please add movie title</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Title}
                            onChange={this.onChangeMovieName}>
                        </input>
                    </div>

                    {/* Year */}
                    <div className="form/group">
                        <label>Please add movie year</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Year}
                            onChange={this.onChangeMovieYear}>
                        </input>
                    </div>

                    {/* Poster */}
                    <div className="form/group">
                        <label>Please add movie Poster</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Poster}
                            onChange={this.onChangeMoviePoster}>
                        </input>
                    </div>


                    {/* button for submtting movie data */}
                    <div>
                        <input type="submit"
                            value="Add Movie">
                        </input>
                    </div>
                </form>
            </div>
        );
    }
} 
