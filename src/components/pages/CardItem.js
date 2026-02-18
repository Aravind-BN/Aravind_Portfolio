import React from 'react';

function pathToSectionId(path) {
  const p = (path || '').toLowerCase();
  if (p.includes('achievement')) return 'achievements';
  if (p.includes('life')) return 'hobbies';
  if (p.includes('more') || p.includes('learn')) return 'highlights';
  if (p.includes('project')) return 'projects';
  return 'home';
}

function CardItem(props) {
  const sectionId = pathToSectionId(props.path);
  const scrollToSection = () => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <li className="cards__item">
      <button
        type="button"
        className="cards__item__link"
        onClick={scrollToSection}
      >
        <figure className="cards__item__pic-wrap" data-category={props.label}>
          <img src={props.src} alt="Favourite" className="cards__item__img"/>
        </figure>
        <div className="cards__item__info">
          <h5 className="cards__item__text">{props.text}</h5>
        </div>
      </button>
    </li>
  );
}

export default CardItem;