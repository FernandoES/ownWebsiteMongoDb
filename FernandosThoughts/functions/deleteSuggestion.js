exports = async function(suggestionId){
  const suggestionCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("suggestions");
  operationResult = await suggestionCollection.findOneAndDelete({_id: suggestionId });
  return {operationResult};
};