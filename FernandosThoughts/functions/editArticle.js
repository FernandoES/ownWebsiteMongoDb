exports = async function(article, entryId){
   const articleCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("articles");
  const insertionResult = await articleCollection.findOneAndReplace(
    {_id: new BSON.ObjectId(entryId)},
    {
    ...article, 
    "date": new Date()
  });
  return {insertionResult};
};