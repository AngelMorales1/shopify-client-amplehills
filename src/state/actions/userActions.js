import { client as Apollo } from 'lib/Apollo';
import { customerAccessTokenCreate } from 'state/graphql/user';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const signInUser = payload => dispatch => {
  console.log('p', payload);
  return dispatch({
    type: SIGN_IN_USER,
    payload: Apollo.mutate({
      mutation: customerAccessTokenCreate,
      variables: { input: payload }
    }).then(res => console.log(res))
  });
};
