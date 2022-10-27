exports = ({ token, tokenId, username }) => {
  const emailValidator = /\S+@\S+\.\S+/;
  if ( emailValidator.test(username) ) {
      return { status: 'pending' };
   } else {
      return { status: 'fail' };
   }
}
