import {gql} from '@apollo/client';

export const GET_ME = gql`
 query me{
     User{
        _id
        username
        email
        
        bookCount
        savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
     }
 }

`