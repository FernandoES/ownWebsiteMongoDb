exports = async function(article){
   const articleCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("articles");
  const insertionResult = await articleCollection.insertOne({
    ...article, 
    "date": new Date()
  });
  return {insertionResult};
};