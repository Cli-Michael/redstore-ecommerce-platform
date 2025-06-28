import React, { useState } from 'react';
import { Card, Image, Button, Details, AdditionalImages } from '../assets/css/ProductCardStyles';

const ProductCard = ({ product }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Card>
      <Image src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <p>Rating: {product.rating}</p>
      <Button onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </Button>

      {showDetails && (
        <Details>
          <p><strong>Description:</strong> {product.details.description}</p>
          {product.details.specifications && (
            <p><strong>Specifications:</strong> {product.details.specifications}</p>
          )}
          {product.details.additionalImages && product.details.additionalImages.length > 0 && (
            <AdditionalImages>
              <h4>Additional Images:</h4>
              {product.details.additionalImages.map((img, index) => (
                <img key={index} src={img} alt={`additional-${index}`} />
              ))}
            </AdditionalImages>
          )}
        </Details>
      )}
    </Card>
  );
};

export default ProductCard;
