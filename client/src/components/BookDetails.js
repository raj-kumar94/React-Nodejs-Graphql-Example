import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';


const getBookQuery = gql`
    query($id:ID){
        book(id:$id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    id
                    name
                }
            }
        }
    }
`;


class BookDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }

    displayBookDetails() {
        const {book} = this.props.data;
        if(book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All Books by the author:</p>
                    <ul className="other-books">
                        {
                            book.author.books.map( (item) => {
                                return <li key={item.id}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }else{
            return (
                <div>Please select a book</div>
            )
        }
    }

    render() {
        return (
          <div id="book-details">
              {this.displayBookDetails()}
          </div>  
        );
    }
}


/**
 * whenever the props for this component updated, getBookQuery is gonna re-run
 * and reset the values of variables ' id'
 */

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);