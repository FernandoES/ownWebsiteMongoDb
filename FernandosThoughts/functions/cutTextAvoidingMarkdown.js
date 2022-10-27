exports = function(text) {
  const textLength = 300;
  const markdownSymbols = ['*', '**', '``', '~~','_' ,'__'];
  let reducedText = text.slice(0, textLength);
  const markDownSymbolsOpened = markdownSymbols
  .filter(s => (reducedText.split(s)?.length -1)%2 > 0);
  return reducedText + markDownSymbolsOpened.join(" ") + "...";
}