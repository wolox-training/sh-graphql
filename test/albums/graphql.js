const { gql } = require('apollo-server');

const getAlbum = id => gql`
  query {
  album(id: ${id}) {
    id
    title
    artist
    photos {
      url
    }
  }
}`;

const getAlbums = ({ offset = 0, limit = 5, orderBy = 'id', filter = '' }) => gql`
  query {
    albums(offset: ${offset}, limit: ${limit}, orderBy: ${orderBy}, filter: "${filter}") {
      id
      title
      artist
      photos {
        url
      }
    }
  }
`;

module.exports = { getAlbum, getAlbums };
