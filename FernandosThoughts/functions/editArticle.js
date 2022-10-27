exports = function(article, entryId){
   const articleCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("articles");
  const insertionResult = articleCollection.findOneAndReplace(
    {_id: entryId},
    {
    ...article, 
    date: new Date()
  });
  return {insertionResult};
};