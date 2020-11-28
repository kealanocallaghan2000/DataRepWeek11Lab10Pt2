// import react
import React from 'react';
//import axios http client
import axios from 'axios';



// include export to import to app.js
export class Edit extends React.Component {

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

    //to pull parameter out
    componentDidMount() {
        console.log(this.props.match.params.id);

        axios.get('http://localhost:4000/api/movies/' + this.props.match.params.id)
            .then(response => {
                this.setState({ //updating the state
                    _id: response.data._id,
                    Title: response.data.title,
                    Year: response.data.year,
                    Poster: response.data.poster
                })
            })
            .catch((error) => {
                console.log("Error");
            });
    }

    //method for when values are changed
    onChangeMovieName(e) {
        this.setState({ Title: e.target.value })
    }

    onChangeMovieYear(e) {
        this.setState({ Year: e.target.value })
    }

    onChangeMoviePoster(e) {
        this.setState({ Pposter: e.target.value })
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
            poster: this.state.Poster,
            _id: this.state._id
        }

        axios.put('http://localhost:4000/api/movies/' + this.state._id, newMovie)
            .then(res => {
                console.log(res.data)
            })
            .catch();


        //post request to url   
        // axios.post('http://localhost:4000/api/movies', newMovie)
        // .then((res)=>{
        //     console.log(res);
        // })
        // .catch((err)=>{
        //     console.log(err);
        // });
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
                            value="Edit Movie">
                        </input>
                    </div>
                </form>
            </div>
        );
    }
} 
