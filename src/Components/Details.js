    import React from 'react';
    import '../Styles/details.css';
    import queryString from 'query-string'
    import axios from 'axios';
    import Modal from 'react-modal';
    import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
    import { Carousel } from 'react-responsive-carousel';

    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #192f60',
        backgroundColor: 'white',
        },
    };
  

    class Details extends React.Component{
        constructor() {
            super();
            this.state = {
                restaurant: [],
                restaurantId: undefined,
                menuItem: [],
                subTotal:0,
                itemsModalIsOpen: false,
                galleryModalIsOpen:false,
                userDetailsModalIsOpen: false,
                name:undefined,
                email:undefined,
                mobileNumber:undefined,
                address:undefined
            }
        }
        componentDidMount() {
            const qs = queryString.parse( this.props.location.search );
            const { restaurantId } = qs
            // console.log(qs)
            axios({
                url:`https://limitless-retreat-50153.herokuapp.com/api/getRestaurantsById/${restaurantId}`,
                method: "GET",
                headers: {'Content-Type':'application/json'},
                }).then(res =>{
                    this.setState({ restaurant: res.data.restaurants[0], restaurantId})
                }).catch()
                console.log("i m working fine")
    }

    handleOrder = () =>{
        const { restaurantId } = this.state
        axios({
            url:`https://limitless-retreat-50153.herokuapp.com/api/MenuDetails/${restaurantId}`,
            method: "GET",
            headers: {'Content-Type':'application/json'},
            }).then(res =>{
                this.setState({ menuItem: res.data.menuItems, itemsModalIsOpen: true, subTotal:0})
            }).catch()
            console.log("i m Handling Orders Perfectly")
    }


    handleCloseModal= (state, value) =>{
        this.setState({[state]: value})
    }

    addItems = (index, operationType) => {
        let total = 0;
        const items = [...this.state.menuItem];
        const item = items[index];

        if (operationType == 'add') {
            item.qty = item.qty + 1;
        }
        else {
            item.qty = item.qty - 1;
        }
        items[index] = item;
        items.map((item) => {
            total += item.qty * item.price;
        })
        this.setState({ menuItem: items, subTotal: total });
    }
    handlegallery = () => {
            this.setState( {galleryModalIsOpen:true} )
    }
    handlePay = () => {
        const { subTotal } = this.state

            if (subTotal!==0)
             {this.setState( { userDetailsModalIsOpen: true, itemsModalIsOpen:false} )}
            else{alert("add some item")} 
    }
    handleInputChange= (event, state) => {
        this.setState({[state]: event.target.value})
    }


    // paytm payment callback code
    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = (data) => {
        return fetch(`https://limitless-retreat-50153.herokuapp.com/api/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    }

    payment = () => {
        const { email, subTotal } = this.state;
        this.getData({ amount: subTotal, email }).then(response => {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            this.post(information)
        })
    }
    
    render(){
        const { restaurant, itemsModalIsOpen, menuItem, subTotal, galleryModalIsOpen, userDetailsModalIsOpen, name, email, mobileNumber, address } = this.state;
        return(
            <div>
                <div>
                {/* <Carousel showThumbs={false} autoPlay={true}> */}
                    <img src={restaurant.detailspgeimg} alt="No Image, Sorry for the Inconvinience" width="100%" height="400" />
                {/* </Carousel> */}
                    <button className="button" onClick={this.handlegallery}>Click to see Image Gallery</button>
                </div>
                <div className="headingdetails">{ restaurant.name } </div>
                <button className="btn-order zoomdetailbtn" onClick={this.handleOrder}> Order Now</button>

                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" checked />
                        <label className="zoomlabel" for="tab-1">Overview</label>

                        <div className="content">
                            <div className="about">About this place</div><br/>
                            <div className="head">Cuisine</div>
                            <div className="value">{restaurant && restaurant.cuisine && restaurant.cuisine.map(item => `${item.name},`)}</div>
                            <div className="head">Average Cost</div>
                            <div className="value">&#8377; {restaurant.min_price} for two people(approx)</div>
                        </div>
                    </div>

                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1" />
                        <label className="zoomlabel" for="tab-2">Contact</label>

                        <div className="content">
                            <div className="head">Phone Number</div>
                            <div className="value">{`+${restaurant.contact_number}`}</div>
                            <div className="head">{restaurant.name}</div>
                            <div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={itemsModalIsOpen}
                    style={customStyles}
                    // className='modal'
                    
                >
                    <div style={{height:"394px", width:"384px"}}>
                        <span className="fa fa-times-circle closebtn zoomclosebtn" onClick={() => this.handleCloseModal('itemsModalIsOpen', false)}></span>
                        <div >
                            <div style={{display:"block"}}>
                                <h3 className="restaurant-name" style={{color:"#192f60"}}>{restaurant.name}</h3>
                                <h3 className="item-total" style={{color:"#192f60",display:"block"}}>SubTotal : {subTotal}</h3>
                                <button className="btn btn-danger pay" style={{display:"block", marginBottom:"36px"}} onClick={this.handlePay}> Pay Now</button>
                            </div>
                            {menuItem.map((item, index) => {
                                return <div style={{ width: '24rem', marginTop: '10px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
                                    <div className="card" style={{ width: "385px", margin: "auto", backgroundColor: "white", border: "none" }}>
                                        <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ paddingLeft: '10px', marginBottom:"-36px" }}>
                                            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 " style={{ paddingLeft: '10px', paddingBottom: '10px',width:"550px" }}>
                                                <span className="card-body">
                                                    <h5 className="item-name" style={{color:"#192f60"}}>{item.name}</h5>
                                                    <h5 className="item-price" style={{color:"#192f60"}}>&#8377;{item.price}</h5>
                                                    <p className="item-descp" style={{color:"#192f60", width: "283px"}}>{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"> <img className="card-img-center title-img" src={item.image} style={{ height: '100px', width: '100px', 'border-radius': '20px', position: "absolute",bottom: "15px",left: "76%" }} />
                                                {item.qty == 0 ? <div><button className="add-button zoomdetailadditem" onClick={() => this.addItems(index, 'add')}>Add</button></div> :
                                                    <div className="add-number">
                                                        <button className="zoomdetailadditem" style={{border:"0.25px solid #192f60"}} onClick={() => this.addItems(index, 'subtract')}>-</button>
                                                        <span style={{ backgroundColor: 'white', color:"#192f60"}}>{item.qty}</span>
                                                        <button className="zoomdetailadditem" style={{border:"0.25px solid #192f60"}} onClick={() => this.addItems(index, 'add')}>+</button>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            <div className="card" style={{ width: '383px', margin: 'auto' }}>

                            </div>
                        </div>
                    </div>  
                </Modal>

                <Modal
                     isOpen={galleryModalIsOpen}
                     style={customStyles}
                >
                    <div className="fa fa-times-circle closebtn zoomclosebtn" onClick={() => this.handleCloseModal('galleryModalIsOpen', false)}></div>
                        <Carousel showThumbs={false} autoPlay={true}>
                        
                            {restaurant && restaurant.thumb && restaurant.thumb.map((item)=>{
                                return <div><img src={`${item}`} height="500px" width="200px" /></div>
                            })}
                           
                        </Carousel>
                </Modal>

                <Modal
                     isOpen={userDetailsModalIsOpen}
                     style={customStyles}
                >
                    <span className="fa fa-times-circle closebtn zoomclosebtn" onClick={() => this.handleCloseModal('userDetailsModalIsOpen', false )}></span><br/>
                    <div>
                        <label>Name</label>
                        <input type="text" class="form-control" placeholder="Enter your name" style={{width:"350px"}} value={name} onChange={(event) => this.handleInputChange(event, 'name')}/>
                        
                        <label>Email address</label>
                        <input type="email" class="form-control" placeholder="name@example.com" style={{width:"350px"}} value={email} onChange={(event) => this.handleInputChange(event, 'email')}/>
                        
                        <label>Phone number</label>
                        <input type="number" class="form-control" placeholder="Enter phone number" style={{width:"350px"}} value={mobileNumber} onChange={(event) => this.handleInputChange(event, 'mobileNumber')}/>
                        
                        <label>Address</label>
                        <input type="text" class="form-control" placeholder="Enter your address" style={{width:"350px"}} value={address} onChange={(event) => this.handleInputChange(event, 'address')}/>
                    </div>
                    <button className="btn btn-danger pay" style={{float:"right", position: "relative", top: "12px"}} onClick={this.payment}> Proceed</button>
                </Modal>
                
            </div>
        )
    }
}

export default Details;