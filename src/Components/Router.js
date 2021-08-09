import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Filter from './Filter';
import Details from './Details';
import Header from './Header'
function Router() {

    return(
        <BrowserRouter>
            <Header />
             <Route exact path="/" component= { Home }/>
             {/* In Router there are 2 things one is path and second one is component this is how we declear router */}
             <Route path="/filter" component= { Filter }/>
             <Route path="/details" component= { Details }/>
        </BrowserRouter>
    )
}

export default Router;