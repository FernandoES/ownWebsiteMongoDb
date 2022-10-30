// This function is the endpoint's request handler.
exports = async function(id, userName, userMail) {
   const userCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("users");
    if (!id || !userName|| !userMail) {
        return 'user_id or useNamer not delivered';
    }
    const user = {
      "user_id": id,
      "userName": userName,
      "userMail": userMail
    }
    if(user.user_id == context.user.id) {
      const countDocuments = await userCollection.count({ user_id: user.user_id});
      if(countDocuments == 0 ) {
        await userCollection.insertOne(user);
      }
      else {
        await userCollection.findOneAndReplace({ user_id: user.user_id},user);
      }
    return "done";
    }
    return {user: user, context: context};
};
