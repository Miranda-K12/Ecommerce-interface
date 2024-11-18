//Header
const header = document.querySelector('.header');
const changeBackground = function(){
  window.scrollY > 50? header.classList.add('changed') : header.classList.remove('changed');
  };

  window.addEventListener('scroll', changeBackground);
//Fetch data
 const Itemcontainer = document.querySelector('.item-container');
fetch('https://dummyjson.com/products/category/smartphones')
  .then(res => res.json())
  .then(data => {
    data.products.forEach((product, index) => {
      // Create an item box
      const itemBox = document.createElement('div');
      itemBox.classList.add('item-box');

      // Create the image element
      const itemImg = document.createElement('div');
      itemImg.classList.add('item-img');
      itemImg.style.backgroundImage = `url(${product.thumbnail})`;
      if (index === 0) {
        itemImg.style.clipPath = 'inset(10% 20% 10% 20%)';
      }
      // Create Item Title
      const itemTitle = document.createElement('h2');
      itemTitle.classList.add('item-title');
      itemTitle.textContent = product.title;

      // Create the price
      const itemPrice = document.createElement('p');
      itemPrice.classList.add('item-price');
      itemPrice.textContent = `$${product.price}`;
      //Create Discaunt
      const discaunt = document.createElement('p')
      discaunt.classList.add('item-discount');
      discaunt.textContent = `Discount: ${product.discountPercentage}%`;

      //Create  Description
      const itemDescription = document.createElement('p');
      itemDescription.classList.add('item-description');
      itemDescription.textContent = product.description;

      // Populate the rating
      const itemRating = document.createElement('div');
      itemRating.classList.add('item-rating');
      itemRating.textContent = `${product.rating}`;
      const itemIcon = document.createElement('div');
      //Add Heart Icon
      itemIcon.classList.add('item-icon');
      //Star Container
      const itemStars = document.createElement('div');
      itemStars.classList.add('stars');
      itemStars.style.display = 'flex';

      //Insert Raiding and Stars in one continer
      const raitingBox = document.createElement('div');
      raitingBox.classList.add('raiting-box');
      raitingBox.appendChild(itemStars);
      raitingBox.appendChild(itemRating);

      // Images of Raiting
      const filledStar = './images/orange-star.svg';
      const emptyStar = './images/grey-star.svg';
      const addEmptyStar = () => {
        const emptyStarElement = document.createElement('img');
        emptyStarElement.classList.add('star');
        emptyStarElement.src = emptyStar;
        itemStars.appendChild(emptyStarElement);
      }

      // Add Stars according to rating
      //more than 4.5 rating
      if (product.rating >= 4.5) {
        for (let i = 0; i < 5; i++) {
          const star = document.createElement('img');
          star.classList.add('star');
          star.src = filledStar;
          itemStars.appendChild(star);

        }
      }
      //rating From 3.5-4.5
      if (product.rating >= 3.5 && product.rating < 4.5) {
        for (let i = 0; i < 4; i++) {
          const star = document.createElement('img');
          star.classList.add('star');
          star.src = filledStar;
          itemStars.appendChild(star);
        }
        addEmptyStar();
      }
      //rating From 2.5-3.5
      if (product.rating >= 2.5 && product.rating < 3.5) {
        for (let i = 0; i < 3; i++) {
          const star = document.createElement('img');
          star.classList.add('star');
          star.src = filledStar;
          itemStars.appendChild(star);
        }
        addEmptyStar();
        addEmptyStar();
      }
      // Append elements to the item box
      itemBox.appendChild(itemImg);
      itemBox.appendChild(itemPrice);
      itemBox.appendChild(discaunt);
      itemBox.appendChild(itemTitle);
      itemBox.appendChild(raitingBox);
      itemBox.appendChild(itemDescription);
      itemBox.appendChild(itemIcon);
      Itemcontainer.appendChild(itemBox);
    });
  })
  .catch(() => {
    setTimeout(() => {
        const errorMessage = document.querySelector('.error-message');
        errorMessage.style.display = 'block';
    }, 2000); 
});
