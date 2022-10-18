export function compareArticlesByDate(firstArticle: {date?: string}, secondArticle: {date?: string}): number {
    if(!firstArticle.date) {
        return -1;
      }
      if (!secondArticle.date) {
        return 1;
      }
      const first = new Date(firstArticle.date);
      const second = new Date(secondArticle.date);
      return second.getTime() - first.getTime();
}