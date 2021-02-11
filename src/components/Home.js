import React, { useState } from 'react';
import { getValidMeme } from '../utils/appUtils';

let count = 0;

const Home = () => {
  const [image, setImage] = useState('http://imgflip.com/s/meme/Grumpy-Cat.jpg');
  const [prevImages, setPrevImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const GenerateMeme = () => {
    setLoading(true);

    if (loading) return;

    getValidMeme().then(data => {
      if (prevImages.length === 0) {
        count = 1;
        setPrevImages([...prevImages, image, data.image]);

      } else {
        count = 1;
        setPrevImages([...prevImages, data.image]);
      };

      setImage(data.image);
      setLoading(false);
    }).catch(e => {
      setLoading(false);
      console.log(e);
    })
  };

  const loadPreviousMeme = () => {
    if (loading) return;

    count++;
    if (count <= prevImages.length) {
      setImage(prevImages[prevImages.length - count]);
    }
  };

  return (
    <section className="container">
      <article className="row ">
        <header className="col p-0 m-0 text-center">
          <h1>Get funny Meme</h1>
        </header>
      </article>
      <article className="row my-row justify-content-between">
        <button
          className="col-md-4 col-xs-12"
          onClick={loadPreviousMeme}
          disabled={prevImages.length === count}
        >Previous Meme
    </button>
        <button
          className="col-md-4 col-xs-12"
          onClick={GenerateMeme}
        >Generate Meme</button>
      </article>
      <article className="row mt-1">
        {loading ? <p className='double-font-size'>Loading...</p> :
          <img
            className="col-12 p-0 m-0"
            src={image}
            alt="Meme"
          />
        }
      </article>
    </section>
  );
};

export default Home;