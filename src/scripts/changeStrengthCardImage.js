export const changeSrengthCardImage = (url) => {
  //"#targetImage にimgeのidを入れる
  const target = document.querySelector("#targetImage");
  const newUrl = url;
  target.src = newUrl;
};
