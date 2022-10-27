exports = async function({ query, headers, body}, response) {
  const articleCollection = context.services.get("mongodb-atlas").db("FernandosThoughtsDB").collection("articles");
    const articles = await articleCollection.find().toArray();
    return articles.map(article => {
        return {...article,
            authorName: article.authorName,
            authorMail: article.authorMail,
            date: article.date,
            title: article.title,
            _id: article._id,
            imageName: article.imageName,
            body:  context.functions.execute("cutTextAvoidingMarkdown",article.body)
        };
    });
};

