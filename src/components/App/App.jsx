import React, { Component } from 'react';
// ============ Section ============
import Section from '../Section/Section';
// ============ Searchbar ============
import Searchbar from '../Searchbar/Searchbar';
// ============ Gallery ============
import Gallery from 'components/Gallery/Gallery';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

  // Function that sets the state with the dataForm value upon submission.
  handleSubmit = dataForm => {
    this.setState({ searchQuery: dataForm.trim() });
  };
  // Check if searchQuery has changed
  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
    }
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        <Section>
          <Gallery searchQuery={this.state.searchQuery}></Gallery>
        </Section>
      </>
    );
  }
}
