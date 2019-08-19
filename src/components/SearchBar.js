import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types'


export default class SearchBar extends Component {
    static proptypes = {
        searchDeals: PropTypes.func.isRequired,
        initSearchTerm: PropTypes.string.isRequired,
    }
    state = {
        searchTerm: this.props.initSearchTerm,
    }
    searchDeals = (searchTerm) => {
        this.props.searchDeals(searchTerm);
        this.inputElement.blur();
    }

    debouncedSearchDeals = debounce(this.searchDeals, 300)
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, ()=>{
            this.debouncedSearchDeals(this.state.searchTerm);
        })
    }
    
    render() {
        return (
            <TextInput 
            ref={(inputElement) => {this.inputElement = inputElement}}
            value={this.state.searchTerm}
            onChangeText={this.handleChange}
            placeholder="Search All Deals"
            style={styles.input}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12,
    }
})