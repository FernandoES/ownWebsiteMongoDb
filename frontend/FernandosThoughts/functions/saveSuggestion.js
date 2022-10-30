exports = function(suggestion){
   const suggestionCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("suggestions");
  const operationResult = suggestionCollection.insertOne({
    ...suggestion, 
    date: new Date()
  });
  return {operationResult};
};