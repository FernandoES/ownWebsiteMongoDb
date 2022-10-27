exports = async function(articleId){
  const articleCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("articles");
    const article = await articleCollection.findOne({_id: new BSON.ObjectId(articleId)});
    if (!article) {
        return {'status': 'response.article.error.noArticleId'};
    }
    return article;
};