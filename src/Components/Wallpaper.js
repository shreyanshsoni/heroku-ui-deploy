import React from 'react';
import '../Styles/home.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component{

    constructor(){
        super()
        this.state = {
            restaurant: [],
            inputText: '',
            suggestions:[]
        }
    }

    handleDropdownChange = (event)  => {
        const locationId = event.target.value;
        //console.log(locationId);
        sessionStorage.setItem('location', locationId);

        axios({
            url:`https://limitless-retreat-50153.herokuapp.com/api/getRestaurantsByLocation/${locationId}`,
            method: "GET",
            headers: {'Content-type':'application/json'}
        }).then(response =>{
            this.setState({restaurant : response.data.restaurants})
        }).catch()
        console.log('i am Searchbar API')
    }

    handleInputChange = (event) => {
        const input = event.target.value
        const { restaurant } = this.state
        console.log(restaurant)

        let filteredRes = [];

        if (input.length > 0) {
            filteredRes = restaurant.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
        }
        this.setState(() => ({
            suggestions: filteredRes,
            inputTxt: input
        }))
        console.log('i am handleInputChange')
    }

    selectedText = (restuarant) => {
        this.props.history.push(`/details?restaurantId=${restuarant._id}`)
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;

        console.log(suggestions)

        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul className='unOrderedList'>
                {
                    suggestions.map((item, index) => (<li className='listItem' key={index} onClick={() => this.selectedText(item)}>{`${item.name}, ${item.city}`}</li>))
                }
            </ul>
        );
    }


    render(){
        const { locationData } = this.props;
        // const {  inputText } = this.state;
        return(
            <div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
                <div className="container-fluid">

                   <img className="img" src="./assets/Homepage.png" alt="image not available" />
        
             
                   <div className="rounded-circle logo">
                      e!
                   </div>

                   <h1 className="heading">
                    Find the best restaurants, cafés, and bars
                   </h1>

                   <div className="row search">
                       <div className="col-12 col-sm-12 col-md-6 pleasebox">

                            <select className="location" onChange={this.handleDropdownChange}>
                                <option value="0" selected disabled>Select</option>
                               
                                {locationData.map((item, index) => {
                                   return <option key={ index } value={item.location_id}>{`${item.name},${item.city}`}</option>
                               })}                               
                            </select>

                       </div>
                       
                       <div className="col-12 col-sm-12 col-md-6 searchbarcontainer" >
                            <span className="searchbaricon fa fa-search"></span> 
                          <div id='notebooks'>
                                <input id= "query" className="searchbar" type="text" placeholder="Search for restaurants" value={ this.inputText } onChange={ this.handleInputChange }/> 
                                <div>{this.renderSuggestions()}</div>
                          </div>
                        </div>
                   </div>
                   
                   {/* <div className="upperbutton">

                      <button className="login zoom">Login</button> 
                   
                      <button className="create zoom">Create an account</button>

                   </div> */}
                       
                </div>

            </div>
        )
    }
}

export default withRouter(Wallpaper);