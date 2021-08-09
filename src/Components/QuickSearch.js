import React from 'react';
import '../Styles/home.css';

import QuickSearchItem from './QuickSearchItem';

class QuickSearch extends React.Component{
    render(){
        const{ quickSearchData }=this.props;
        return(
            <div>
                <div className="container">

                    <div className="row quicksearches"> 
                        Quick Searches
                    </div>

                    <div className="row discover">
                        Discover restaurants by type of meal
                    </div>



                    <div className="row upper gx-5">
                        
                    {quickSearchData.map((item,index) =>{
                            return <QuickSearchItem key={index} qsItemData={ item }/>
                        })}
                            
                            
                    </div>

                    </div>
            </div>
        )
    }
}


export default QuickSearch;