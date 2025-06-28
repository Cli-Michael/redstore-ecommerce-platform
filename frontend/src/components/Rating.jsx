import React from 'react';

const Rating = ({ value }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, i) => <i key={i} className="fa fa-star" />)}
      {halfStar && <i className="fa fa-star-half-o" />}
      {[...Array(emptyStars)].map((_, i) => <i key={i} className="fa fa-star-o" />)}
    </div>
  );
};

export default Rating;
