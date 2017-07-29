import React, { Component } from 'react';

// ref : https://facebook.github.io/react/docs/thinking-in-react.html


class DetailItem extends Component {
  render() {    
    return (
      <li>        
        <span className="post-meta">{ this.props.item.date}</span>
        <h2>
          <a className="post-link" href={this.props.item.url}>{ this.props.item.title}</a>
        </h2>
        <p>{this.props.item.description}</p>
      </li>
    );
  }
}



class ListItems extends Component {
  render() {
    var list = [];
    // var lastCategory = null;

    this.props.items.forEach((item) => {

      // if (item.title.indexOf(this.props.filterText) === -1 || (!item.stocked && this.props.inStockOnly)) {
      //   return;
      // }
      if (item.title.indexOf(this.props.filterText) === -1 || item.description.indexOf(this.props.filterText) === -1) {
        return;
      }
      // if (item.category !== lastCategory) {
      //   rows.push(<ProductCategoryRow category={item.category} key={item.category} />);
      // }
      list.push(<DetailItem item={item} key={item.title} />);
      // lastCategory = item.category;
    });
    return (
      <ul className="post-list">
        {list}
      </ul>
      
    );
  }
}


class SearchBar extends Component {
 
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInUpdateInputChange = this.handleInUpdateInputChange.bind(this);
  }
  
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }
  
  handleInUpdateInputChange(e) {
    this.props.onInUpdateInput(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

//<p>
//  <input
//    type="checkbox"
//    checked={this.props.inUpdateOnly}
//    onChange={this.handleInUpdateInputChange}
//  />
//  {' '}
//  Only show last updates
//</p>

export default class FilterableListPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      filterText: '',
      inUpdateOnly: false
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInUpdateInput = this.handleInUpdateInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInUpdateInput(inUpdateOnly) {
    this.setState({
      inUpdateOnly: inUpdateOnly
    })
  }

  componentDidMount() {
    return fetch(BASE_URL+JSON_URL_POSTS)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.posts
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <SearchBar
            filterText={this.state.filterText}
            inUpdateOnly={this.state.inUpdateOnly}
            onFilterTextInput={this.handleFilterTextInput}
            onInUpdateInput={this.handleInUpdateInput}
          />
        </div>       
      );
    }

    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inUpdateOnly={this.state.inUpdateOnly}
          onFilterTextInput={this.handleFilterTextInput}
          onInUpdateInput={this.handleInUpdateInput}
        />
        <ListItems
          items={this.state.dataSource}
          filterText={this.state.filterText}
          inUpdateOnly={this.state.inUpdateOnly}
        />
      </div>
      
    );
  }
}