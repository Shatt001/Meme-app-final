import $ from "jquery";

const getRandomId = (maxValue) => {
  const max = maxValue ? maxValue : 200;
  const id = Math.trunc(Math.random() * max) + 1;
  return id;
};

const getRandomMeme = (url) => {
  const result = $.get(
    url,
    "json"
  );
  return result;
};

const memeIsAvailable = (url) => {
  const result = $.get(
    url,
    "json"
  );
  return result;
};


export const getValidMeme = async () => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const memeUrl = `http://alpha-meme-maker.herokuapp.com/memes/${getRandomId(259)}/`;
  let result;
  await getRandomMeme(proxyUrl + memeUrl).then(data => {
    result = data.data;
    return memeIsAvailable(proxyUrl + data.data.image)
  }).then(data => {
    undefined;
  }).catch(err => {
    result = getValidMeme();
  });

  return result;
};