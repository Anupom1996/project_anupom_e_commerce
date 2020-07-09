import React, { Component ,Fragment} from 'react';
import Dashboard_navBar from '../components/Dashboard_navBar/Dashboard_navBar'
import CategoryNavBar from '../components/Category/CategoryNavBar';
import ShowCategory from '../components/ShowCategory/ShowCategory';
class CategoryPage extends Component {
    constructor(){
        super();
        this.state = {
            filteredCategorys: []
        }
    }

    emitCategory = (event) => {
        this.setState({filteredCategorys: event});
    }
    render() {
        return (
            <Fragment>
                 <Dashboard_navBar></Dashboard_navBar>
                <CategoryNavBar onSearch={this.emitCategory}></CategoryNavBar>
                <ShowCategory filteredCategorys = {this.state.filteredCategorys}></ShowCategory>
            </Fragment>
        );
    }
}

export default CategoryPage;