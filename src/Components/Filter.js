import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: [],
            locations:[],
            mealtype:undefined,
            location:undefined,
            cuisine:[],
            lcost:undefined,
            hcost:undefined,
            sort:undefined,
            page:1,
            pageCount:[],
    }        
};
   componentDidMount(){
       //step1 read the quary string param from the url;                      
      // & query string is all after the '?' in URL;        
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, location, mealtypeValue}= qs;

        const reqObj={
            mealtype: mealtype, 
            location:location
        };

    //    step2 filter API call with request param; 
    axios({
        url:'https://limitless-retreat-50153.herokuapp.com/api/getFilteredRestaurants',
        method: "POST",
        headers: {'Content-Type':'application/json'},
        data: reqObj
        }).then(res =>{
            this.setState({ restaurant :res.data.restaurant, mealtype: mealtype, location:location, pageCount:res.data.pageCount, mealtypeValue})
        }).catch()
        
        axios({
            url:'https://limitless-retreat-50153.herokuapp.com/api/getLocations',
            method: "GET",
            headers: {'Content-Type':'application/json'}
        }).then(response =>{
            this.setState({locations : response.data.location})
        }).catch()
    } 

    handleSortChange = (sort) => {
        const { mealtype,location,lcost,hcost,page,cuisine } = this.state ;
        const reqObj = {
            sort:sort,
            mealtype: mealtype,
            location:location,
            cuisine:cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost:hcost,
            page
        };
        
    //    step2 filter API call with request param; 
       axios({
        url:'https://limitless-retreat-50153.herokuapp.com/api/getFilteredRestaurants',
        method: "POST",
        headers: {'Content-Type':'application/json'},
        data: reqObj
        }).then(res =>{
            this.setState({ restaurant :res.data.restaurant, sort:sort, pageCount:res.data.pageCount})
        }).catch() 

    }

    handleCostChange = (lcost,hcost) => {
        const { mealtype,location ,sort,page,cuisine} = this.state ;
        const reqObj = {
            sort:sort,
            mealtype: mealtype,
            location:location,
            cuisine:cuisine.length == 0 ? undefined : cuisine,
            lcost:lcost,
            hcost:hcost,
            page
        };
        
     //step2 filter API call with request param; 
       axios({
        url:'https://limitless-retreat-50153.herokuapp.com/api/getFilteredRestaurants',
        method: "POST",
        headers: {'Content-Type':'application/json'},
        data: reqObj
        }).then(res =>{
            this.setState({ restaurant :res.data.restaurant, lcost:lcost, hcost:hcost, pageCount:res.data.pageCount})
        }).catch() 

        
    }

    handleLocationChange = (event) => {
    
        const { mealtype, sort, hcost, lcost,page,cuisine} = this.state ;
        const location= event.target.value;
        //console.log(location)
        const reqObj = {
            sort:sort,
            mealtype: mealtype,
            location:location,
            cuisine:cuisine.length == 0 ? undefined : cuisine,
            lcost:lcost,
            hcost:hcost,
            page:page
        };
        
     //step2 filter API call with request param; 
       axios({
        url:'https://limitless-retreat-50153.herokuapp.com/api/getFilteredRestaurants',
        method: "POST",
        headers: {'Content-Type':'application/json'},
        data: reqObj
        }).then(res =>{
            this.setState({ restaurant :res.data.restaurant, location, pageCount:res.data.pageCount})
        }).catch()
    }

    
        handlePageChange = (page) => {
    
            const { mealtype, location,sort, hcost, lcost,cuisine} = this.state ;
            const reqObj = {
                sort:sort,
                mealtype: mealtype,
                location:location,
                cuisine:cuisine.length == 0 ? undefined : cuisine,
                lcost:lcost,
                hcost:hcost,
                page:page
            };
            
         //step2 filter API call with request param; 
           axios({
            url:'https://limitless-retreat-50153.herokuapp.com/api/getFilteredRestaurants',
            method: "POST",
            headers: {'Content-Type':'application/json'},
            data: reqObj
            }).then(res =>{
                this.setState({ restaurant :res.data.restaurant, page, pageCount:res.data.pageCount})
            }).catch()
        }

        handleCuisineChange = (cuisineId) => {
    
            const { mealtype, location,sort, hcost, lcost,cuisine,page} = this.state ;
            const index = cuisine.indexOf(cuisineId);
            // console.log(index)
            if (index >-1){
                cuisine.splice(index,1);
            }else{
                cuisine.push(cuisineId);
            }
            console.log(index)
            const reqObj = {
                sort:sort,
                mealtype: mealtype,
                location:location,
                cuisine:cuisine.length == 0 ? undefined : cuisine,
                lcost:lcost,
                hcost:hcost,
                page:page
            };
            console.log(reqObj);
            
         //step2 filter API call with request param; 
           axios({
            url:'https://limitless-retreat-50153.herokuapp.com/api/getFilteredRestaurants',
            method: "POST",
            headers: {'Content-Type':'application/json'},
            data: reqObj
            }).then(res =>{
                this.setState({ restaurant :res.data.restaurant, cuisine, page, pageCount:res.data.pageCount})
            }).catch()
        }
    
        handleNavigationDetailsPage = (resId) =>{
            this.props.history.push(`/details?restaurantId=${resId}`)
        }
    
    render() {  
        const { restaurant, locations, pageCount, mealtypeValue,location } = this.state;
        return (
            <div>
                {/* <header>
                    < div className ="header">
                        < div className="style_login">
                            <button className="login zoom">Login</button>
                            <button className="create_account zoom">Create an account</button>
                        </div>
                        <button className="logofilter">
                            <b>e!</b>
                        </button>
                    </div>
                </header> */}
        <div className="container page-header"><p>{`${mealtypeValue} Places in Your City`} </p></div>
        
        <div className="container">
            <div className="row m-2">
                <div className="filter-section col-lg-3 col-md-4 col-sm-12">
                    <div className="title mb-3">
                        <span>Filters</span>
                        {/* <a href="#filterCollapse" className="format visibleFilter visible" data-bs-toggle="collapse" aria-expanded="true" aria-controls="filterCollapse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-expand" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
                          </svg> 
                        </a> */}
                                                    
                    </div>
                    <div id="filterCollapse" className="collapse show">
                        <div className="subtitle mb-2">Select Location</div>
                        <select className="form-select mb-3 selectLocation" aria-label="selectLocation" onChange={this.handleLocationChange}>
                            
                            <option  value={0} selected disabled>Select location</option>
                            {locations.map((item) =>{
                                return  <option value={item.location_id}>{`${item.name},${item.city}`}</option>
                            })}
                            
                            
                        </select>
                        
                        <div className="subtitle mb-2" name="cuisine">Cuisine</div>
                        <div className="form-check options">
                            <input className="form-check-input " type="checkbox" name="cuisine"  onChange={() => this.handleCuisineChange(1)}/>
                            <label className="form-check-label" for="northIndian">North Indian</label>
                        </div>
                        <div className="form-check options">
                            <input className="form-check-input " type="checkbox" name="cuisine"  onChange={() => this.handleCuisineChange(2)}/>
                            <label className="form-check-label" for="southIndian">South Indian</label>
                        </div>
                        <div className="form-check options">
                            <input className="form-check-input " type="checkbox" name="cuisine"  onChange={() => this.handleCuisineChange(3)}/>
                            <label className="form-check-label" for="chinese">Chinese</label>
                        </div>
                        <div className="form-check options">
                            <input className="form-check-input " type="checkbox" name="cuisine"  onChange={() => this.handleCuisineChange(4)}/>
                            <label className="form-check-label" for="fastFood">Fast Food</label>
                        </div>
                        <div className="form-check options mb-3">
                            <input className="form-check-input " type="checkbox" name="cuisine"  onChange={() => this.handleCuisineChange(5)}/>
                            <label className="form-check-label" for="streetFood">Street Food</label>
                        </div>
                        
                        <div className="subtitle mb-2" name="costForTwo">Cost For Two</div>
                            <div className="form-check options">
                                <input className="form-check-input " type="radio" name="cost" id="1to50000" onChange={() => this.handleCostChange(1,50000)}/>
                                <label className="form-check-label" for="1to50000">All</label>
                            </div>
                            <div className="form-check options">
                                <input className="form-check-input " type="radio" name="cost" id="lessThan500" onChange={() => this.handleCostChange(1,500)}/>
                                <label className="form-check-label" for="lessThan500">Less than &#8377;500</label>
                            </div>
                            <div className="form-check options">
                                <input className="form-check-input " type="radio" name="cost" id="500to1000" onChange={() => this.handleCostChange(500,1000)}/>
                                <label className="form-check-label" for="500to1000">&#8377;500 to &#8377;1000</label>
                            </div>
                            <div className="form-check options">
                                <input className="form-check-input " type="radio" name="cost" id="1000to1500" onChange={() => this.handleCostChange(1000,1500)}/>
                                <label className="form-check-label" for="1000to1500">&#8377;1000 to &#8377;1500</label>
                            </div>
                            <div className="form-check options">
                                <input className="form-check-input " type="radio" name="cost" id="1500to2000" onChange={() => this.handleCostChange(1500,2000)}/>
                                <label className="form-check-label" for="1500to2000">&#8377;1500 to &#8377;2000</label>
                            </div>
                            <div className="form-check options mb-3 ">
                                <input className="form-check-input " type="radio" name="cost" id="moreThan2000" onChange={() => this.handleCostChange(2000,50000)}/>
                                <label className="form-check-label" for="moreThan2000">&#8377;2000+</label>
                            </div>
                            
                           

                        <div className="title mb-2" name="sort">Sort</div>
                            <div className="form-check options">
                                <input className="form-check-input " type="radio" name="sort" id="lowToHigh" onChange={() => this.handleSortChange(1)}/>
                                <label className="form-check-label " for="lowToHigh">Price low to high</label>
                            </div> 
                            <div className="form-check options">
                                <input className="form-check-input " type="radio" name="sort" id="highToLow"  onChange={() => this.handleSortChange(-1)}/>
                                <label className="form-check-label" for="highToLow">Price high to low</label>
                            </div>
                    </div> 
                </div>

                <div className="itemsBlock col-lg-8 offset-lg-1 col-md-8 col-sm-12">
                        {restaurant.length !=0 ? restaurant.map((item) =>{
                            return <div className="items zoom" onClick={() => this.handleNavigationDetailsPage(item._id)}>
                                    <div className="items-top">
                                        <div className="images"> <img src={item.image} className="images" alt="" /> </div>
                                        <div className="item-desc">
                                            <div className="restaurant-name">{item.name}</div>
                                            <div className="address-line1">{item.locality}</div>
                                            <div className="address-line2">{item.address}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="items-bottom">
                                        <div className="items-bot-left">
                                            <div>CUISINES:</div>
                                            <div>COST FOR TWO: &#8377; </div>
                                        </div>
                                        <div className="items-bot-right">
                                             <div> {item.cuisine.map((cuisine) => `${cuisine.name} ,`)} </div>
                                            <div> {item.min_price} </div>
                                        </div>
                                    </div>
                                </div>

                        }): <div className="noRecord">No Restaurants Found</div>}

                    {restaurant.length !=0 ? <div class="pagination">
                    <button class="pagination_PageNo zoom">&#60;</button>
                    {pageCount.map((item) => {
                        return <div class="pagination_PageNo zoom" onClick={() => this.handlePageChange(item)}>{item}</div>
                    })}
                    <button class="pagination_PageNo zoom" > &#62;</button>
                  </div>: null}
                </div>
                
            </div>
        </div>

            </div>
        
        )
    }
    }
export default Filter;