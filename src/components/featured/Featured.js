import React, { useState } from 'react';
import './Featured.css';

const POSTS = [
  {
    id: 1,
    text: 'Excited to share that our team placed 3rd at the Stem Seeds Social Innovators workshop. Grateful for the experience and the chance to work on solutions for climate change.',
    date: 'Nov 2024',
    image: null,
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    text: 'Spent the weekend building a small web app with React. Always rewarding to see an idea come to life in code.',
    date: 'Oct 2024',
    image: null,
    likes: 31,
    comments: 5,
  },
  {
    id: 3,
    text: 'Just received my CSIT scholarship offer — incredibly grateful for this opportunity to deepen my cybersecurity journey. Looking forward to what\'s ahead at Ngee Ann Poly!',
    date: 'Jan 2025',
    image: null,
    likes: 89,
    comments: 14,
  },
];

const LINKEDIN_URL = 'https://www.linkedin.com/in/YOUR_PROFILE'; // ← replace with your URL

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function Featured() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="featured" className="page-section featured-section">
      <h2 className="section-heading">featured</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <span style={{ color: '#0077b5', display: 'flex', alignItems: 'center' }}>
          <LinkedInIcon />
        </span>
        <p style={{ fontSize: '0.85rem', color: '#71717a', margin: 0 }}>
          Recent posts from LinkedIn
        </p>
      </div>

      <ul className="featured-list">
        {POSTS.map((post) => (
          <li
            key={post.id}
            className="featured-card"
            style={{
              background: hovered === post.id ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
              borderColor: hovered === post.id ? 'rgba(0,119,181,0.3)' : 'rgba(255,255,255,0.06)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={() => setHovered(post.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700, color: '#fff', flexShrink: 0,
              }}>
                YN
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e4e4e7', margin: 0 }}>Your Name</p>
                <p style={{ fontSize: '0.75rem', color: '#71717a', margin: 0 }}>Student @ NP · {post.date}</p>
              </div>
              <div style={{ marginLeft: 'auto', color: '#0077b5' }}>
                <LinkedInIcon />
              </div>
            </div>

            <p className="featured-text">{post.text}</p>

            {post.image && (
              <div className="featured-image-wrap">
                <img src={post.image.startsWith('http') ? post.image : process.env.PUBLIC_URL + post.image} alt="" />
              </div>
            )}

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '0.78rem', color: '#71717a', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>👍</span> {post.likes}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#71717a', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>💬</span> {post.comments}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* View more button */}
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.65rem 1.4rem',
            background: 'rgba(0,119,181,0.1)',
            border: '1px solid rgba(0,119,181,0.3)',
            borderRadius: '8px',
            color: '#5aade0',
            fontSize: '0.85rem', fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,119,181,0.2)';
            e.currentTarget.style.borderColor = 'rgba(0,119,181,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0,119,181,0.1)';
            e.currentTarget.style.borderColor = 'rgba(0,119,181,0.3)';
          }}
        >
          <LinkedInIcon />
          View more posts on LinkedIn
        </a>
      </div>
    </section>
  );
}

export default Featured;