import React, { Component ,Fragment} from 'react';
import Dashboard_navBar from '../components/Dashboard_navBar/Dashboard_navBar'
import CategoryNavBar from '../components/Category/CategoryNavBar';
class CategoryPage extends Component {
    render() {
        return (
            <Fragment>
                 <Dashboard_navBar></Dashboard_navBar>
                <CategoryNavBar></CategoryNavBar>
            </Fragment>
        );
    }
}

export default CategoryPage;