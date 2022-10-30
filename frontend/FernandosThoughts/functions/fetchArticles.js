exports = async function() {
  const articleCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("articles");
    const articles = await articleCollection.find().toArray();
    return articles.map(article => {
        return {
            authorName: article.authorName,
            authorMail: article.authorMail,
            date: article.date,
            title: article.title,
            _id: article._id,
            smallImage: article.smallImage,
            body:  context.functions.execute("cutTextAvoidingMarkdown",article.body)
        };
    });
};
