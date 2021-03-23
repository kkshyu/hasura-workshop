import { gql, useQuery } from "@apollo/client";
import React from "react";

const ProductListPage = () => {
  const { data, error, loading, fetchMore, refetch } = useQuery(
    gql`
      query GET_ORDERS($status: String!) {
        orders: order(limit: 1, where: { status: { _eq: $status } }) {
          id
          status
          user {
            id
            name
          }
        #   order_products {
        #     product {
        #       title
        #       price
        #     }
        #   }
        }
      }
    `,
    {
      variables: {
        status: "SUCCESS",
      },
    }
  );
  return <div>ProductListPage: {JSON.stringify(data)}</div>;
};

export default ProductListPage;
