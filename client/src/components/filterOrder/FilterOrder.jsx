import React, { Component } from "react";
import { connect } from "react-redux";
import {
  filterByCreated,
  filterByDiet,
  orderByAlpha,
  orderByHealthscore,
  getAllRecipes,
  getDietTypes
} from "../redux/actions";
import style from './FilterOrder.module.css';

class FilterOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.getDietTypes();
  }

  handleAZOrder = (event) => {
    this.props.orderByAlpha(event.target.value);
  };

  handleHealthscoreOrder = (event) => {
    this.props.orderByHealthscore(event.target.value);
  };

  handleFilterDiets = (event) => {
    this.props.setCurrentPage(1)
    this.props.filterByDiet(event.target.value);
  };

  handleFilterOrigin = (event) => {
    this.props.setCurrentPage(1)
    this.props.filterByCreated(event.target.value);
  };

  handleReset = () => {
    this.props.getAllRecipes();
  };

  render() {
    const { dietTypes } = this.props;

    return (
      <div className={style.container}>
        <select className={style.select} name="orderAZ" onChange={this.handleAZOrder}>
          <option value='none'>Order by A-Z</option>
          <option value="A">A-Z</option>
          <option value="D">Z-A</option>
        </select>

        <select className={style.select} name="orderHS" onChange={this.handleHealthscoreOrder}>
          <option value='none'>Order by Health-Score</option>
          <option value="Max">Max</option>
          <option value="Min">Min</option>
        </select>

        <select className={style.select} name="filterD" onChange={this.handleFilterDiets}>
          <option value='none'>Filter by Diet-type</option>
          {dietTypes.map((diet) => (
            <option key={diet.id} value={diet.name}>
              {diet.name}
            </option>
          ))}
        </select>

        <select className={style.select} name="filterO" onChange={this.handleFilterOrigin}>
          <option value='none'>Filter by origin</option>
          <option value="db">created recipes</option>
          <option value="api">web recipes</option>
        </select>
        
        <button className={style.button} value="default" onClick={this.handleReset}>
          reset
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dietTypes: state.dietTypes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRecipes: () => dispatch(getAllRecipes()),
    orderByAlpha: (value) => dispatch(orderByAlpha(value)),
    orderByHealthscore: (value) => dispatch(orderByHealthscore(value)),
    filterByCreated: (value) => dispatch(filterByCreated(value)),
    filterByDiet: (value) => dispatch(filterByDiet(value)),
    getDietTypes: () => dispatch(getDietTypes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterOrder);

