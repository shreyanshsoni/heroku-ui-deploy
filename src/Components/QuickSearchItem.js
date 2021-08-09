import React from 'react';
import '../Styles/home.css';
import { withRouter } from 'react-router-dom';

class QuickSearchItem extends React.Component{
   handleNavigate= (mealtypeId, mealtypeValue) => {
       const locationId=sessionStorage.getItem('location');

       if (locationId) {
        this.props.history.push(`/filter?mealtype=${mealtypeId}&location=${locationId}`);
       }
       else{
        this.props.history.push(`/filter?mealtype=${mealtypeId}&mealtypeValue=${mealtypeValue}`);
       }

      // this.props.history.push(`/filter?mealtype=${mealtypeId}`);
    }


    render(){
        const { qsItemData,key } =this.props;
        return (
            <div key={key }className="col-12  col-sm-12 col-md-6 col-lg-4" onClick={ () => this.handleNavigate(qsItemData._id, qsItemData.name) }>
            <div className="row column  quickSearchItem ">
                <div className="col-5 lowerimgbox"> 
                     <img className="upperimg" src={`./${ qsItemData.image}`} alt="image not available" />
                </div>
                <div  className="col-7">
                    <div className="colheading">
                        {qsItemData.name}
                    </div>
                    <p className="paragraph">
                        {qsItemData.content}
                    </p>
                </div>
           </div>
        </div>   
        )
    }
}

export default withRouter(QuickSearchItem);