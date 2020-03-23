import gql from "graphql-tag";

export const GET_STORES_FOR_SU = gql`
 query getStoreForBuyer($param: GetStoreForBuyerInput!) {
    GetStoreForBuyer(param: $param) {
        ok
        error
        data {
            _id
            name
            user {
                name
            }
            code
            type
            description
            location {
                address
                addressDetail
                lat
                lng
            }
            image
            manager
            createdAt
            productCount   
        }
    }
 }
 
`

