import React, { Component ,Fragment} from 'react';
import Dashboard_navBar from '../components/Dashboard_navBar/Dashboard_navBar'
import CategoryNavBar from '../components/Category/CategoryNavBar';
import ShowCategory from '../components/ShowCategory/ShowCategory';
class CategoryPage extends Component {
    render() {
        return (
            <Fragment>
                 <Dashboard_navBar></Dashboard_navBar>
                <CategoryNavBar></CategoryNavBar>
                <ShowCategory></ShowCategory>
            </Fragment>
        );
    }
}

export default CategoryPage;