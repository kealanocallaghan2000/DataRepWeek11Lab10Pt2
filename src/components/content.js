// import react
import React  from 'react';


// include export to import to app.js
export class Content extends React.Component{

    render(){
        return(
            <div>
                {/* making the clock and hello world a component */}
                <h1>Hello World</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>            
                </div>
        );
    }
} 
