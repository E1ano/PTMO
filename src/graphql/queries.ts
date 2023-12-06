import {gql} from '@apollo/client';

export const GetAllPeople = gql`
  query AllPeople($after: String) {
    allPeople(first: 10, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      people {
        name
        birthYear
        eyeColor
        gender
        hairColor
        height
        mass
        skinColor
        created
        edited
        id
        homeworld {
          name
        }
        species {
          name
        }
      }
    }
  }
`;
