exports = async function(articleId){
  const articlesCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("articles");
  operationResult = await articlesCollection.findOneAndDelete({_id: new BSON.ObjectId(articleId) });
  return {operationResult};
};