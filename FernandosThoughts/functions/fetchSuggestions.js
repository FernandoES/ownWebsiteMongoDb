exports = async function(arg){
   const suggestionsCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("suggestions");
   const suggestions = await suggestionsCollection.find();
  return {suggestions: suggestions};
};