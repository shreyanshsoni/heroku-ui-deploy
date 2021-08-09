import React from 'react';
import axios from 'axios';

import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';


class Home extends React.Component{
    constructor(){
        super();
        this.state={
            locations: [],
            mealTypes:[]
        }
    }
   componentDidMount(){
       sessionStorage.clear();
    axios({
        url:'https://limitless-retreat-50153.herokuapp.com/api/getLocations',
        method: "GET",
        headers: {'Content-type':'application/json'}
    }).then(response =>{
        this.setState({locations : response.data.location})
    }).catch()

    axios({
        url:'https://limitless-retreat-50153.herokuapp.com/api/getMealTypes',
        method: "GET",
        headers: {'Content-type':'application/json'}
    }).then(response =>{
        this.setState({mealTypes : response.data.MealTypes})
    }).catch()
   }

   

    render(){
        const{ locations, mealTypes } = this.state
        return (
            <div>
               
          <Wallpaper locationData={ locations }/>  
          <QuickSearch quickSearchData={ mealTypes }/>       
          
            </div>
        )
    }
}

export default Home;