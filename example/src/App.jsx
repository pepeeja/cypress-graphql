import React from 'react';
import { gql, useQuery } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

export const App = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h3>Books:</h3>
      <ul>
        {data.books.map(({ id, title, author }) => (
          <li key={id} data-cy="book">
            <h4>{title}</h4> <i>{author}</i>
          </li>
        ))}
      </ul>
    </>
  );
};
