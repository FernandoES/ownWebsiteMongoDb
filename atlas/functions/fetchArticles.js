exports = async function(){
   const articlesCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("articles");
   const articles = await articlesCollection.find();
  return articles;
};