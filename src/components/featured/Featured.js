import React from 'react';
import './Featured.css';

/*
 * LinkedIn's API does not allow third-party apps to read personal post content easily.
 * You can add posts manually below, or use a headless approach (e.g. copy-paste from LinkedIn).
 * Optionally add images to public/featured/ and reference them as /featured/image.jpg
 */
const POSTS = [
  {
    id: 1,
    text: 'Excited to share that our team placed 3rd at the Stem Seeds Social Innovators workshop. Grateful for the experience and the chance to work on solutions for climate change.',
    date: 'Recent',
    image: null, // e.g. process.env.PUBLIC_URL + '/featured/post1.jpg'
  },
  {
    id: 2,
    text: 'Spent the weekend building a small web app with React. Always rewarding to see an idea come to life in code.',
    date: 'Recent',
    image: null,
  },
];

function Featured() {
  return (
    <section id="featured" className="page-section featured-section">
      <h2 className="section-heading">featured</h2>
      <p className="featured-intro">
        Updates and thoughts — add posts manually below (or paste from LinkedIn). Images go in <code>public/featured/</code>.
      </p>
      <ul className="featured-list">
        {POSTS.map((post) => (
          <li key={post.id} className="featured-card">
            <p className="featured-text">{post.text}</p>
            {post.image && (
              <div className="featured-image-wrap">
                <img
                  src={post.image.startsWith('http') ? post.image : process.env.PUBLIC_URL + post.image}
                  alt=""
                />
              </div>
            )}
            <span className="featured-date">{post.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Featured;
