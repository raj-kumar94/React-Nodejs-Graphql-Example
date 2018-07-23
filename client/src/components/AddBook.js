import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql, compose} from 'react-apollo';

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`;

const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`;

/**
 * QUERY PARAMETERS
 * Passing variables in mutation
 * $variable name is the variable passed in the query
 * String! or ID! means that the parameter will be of String or ID type and they are required field
 */


const addBookMutation = gql`
    mutation($name:String!, $genre:String!, $authorId:ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name,
            id
        }
    }
`;


class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }

    displayAuthors() {
        // graphql query result is passed to props
        // var data = this.props.data;

        var data = this.props.getAuthorsQuery;
        console.log(data);
        if(data.loading){
            return <option disabled>Loading Authors...</option>
        }else{
            return data.authors.map( (author) => {
                return(
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            });
        } 
    }

    // refetchQueries will refetch the queries given in the array, so that it can refresh the DOM with new books
    submitForm(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }

    render() {
      return (
        <form id="add-book" onSubmit={this.submitForm.bind(this)}>
            <div className="field">
                <label>Book Name:</label>
                <input type="text" onChange={ (e) => this.setState({name:e.target.value})} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={ (e) => this.setState({genre:e.target.value})} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={ (e) => this.setState({authorId:e.target.value})} >
                    <option>Select Author</option>
                    {this.displayAuthors()}
                </select>
            </div>

            <button>+</button>

        </form>
      );
    }
  }
  
  // use graphql to bind getAuthorsQuery to AddBook component
//   export default graphql(getAuthorsQuery)(AddBook);



/**
 * Since there are mupliple graphql queries, they cannot be binded like the method above
 * The solution to this problem is to use 'compose'
 */

export default compose(
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook);
  