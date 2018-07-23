import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

import BookDetails from './BookDetails';

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`;

// console.log({getBooksQuery});
class BookList extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
          selected: null
      }
  }  

  displayBooks() {
    let data = this.props.data; // graphql query result is passed to props
    if(data.loading){
        return <div>Loading Books...</div>
    }else{
        return data.books.map( (book) => {
            return(
                <li key={book.id} onClick={ (e) => {this.setState({selected:book.id})}}>{book.name}</li>
            )
        });
    }    
  }

  render() {
      console.log(this.props);
    return (
      <div>
        <ul id="book-list">
            {this.displayBooks()}
        </ul>  
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

// use graphql to bind getBooksQuery to BookList component
export default graphql(getBooksQuery)(BookList);
