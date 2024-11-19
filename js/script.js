//Header
const header = document.querySelector('.header');
const changeBackground = function(){
  window.scrollY > 50? header.classList.add('changed') : header.classList.remove('changed');
  };

window.addEventListener('scroll', changeBackground);
  
//Create variables for item-container
const itemContainer = document.querySelector('.item-container');
const sortSelect = document.querySelector('#sort'); 
let productData = [];

// Fetch Data
fetch('https://dummyjson.com/products/category/smartphones')
  .then(res => res.json())
  .then(data => {
    productData = data.products;
    drawItems(productData); 
    
    //Sort Elements
    sortSelect.addEventListener('change', (e) => {
      const selectedValue = e.target.value;
      if (selectedValue === '1') { 
        const sortedByPrice = [...productData].sort((a, b) => a.price - b.price);
        drawItems(sortedByPrice);
      } else if (selectedValue === '2') { 
        const sortedByName = [...productData].sort((a, b) => a.title.localeCompare(b.title));
        drawItems(sortedByName);
      }
    });
  })
  //Handle Error
  .catch(() => {
    setTimeout(() => {
      const errorMessage = document.querySelector('.error-message');
      errorMessage.style.display = 'block';
    }, 2000);
  });

// Drawing Items Function
function drawItems(products) {
  itemContainer.innerHTML = ''; // Clear existing items before drawing new ones
  products.forEach((product, index) => {
    const itemBox = document.createElement('div');
    itemBox.classList.add('item-box');
    
    const itemImg = document.createElement('div');
    itemImg.classList.add('item-img');
    itemImg.style.backgroundImage = `url(${product.thumbnail})`;
    if (index === 0 || index === 1) {
      itemImg.style.clipPath = 'inset(6% 25% 6% 25%)';
    }

    const itemTitle = document.createElement('h2');
    itemTitle.classList.add('item-title');
    itemTitle.textContent = product.title;

    const itemPrice = document.createElement('p');
    itemPrice.classList.add('item-price');
    itemPrice.textContent = `$${product.price}`;

    const discount = document.createElement('p');
    discount.classList.add('item-discount');
    discount.textContent = `Discount: ${product.discountPercentage}%`;

    const itemDescription = document.createElement('p');
    itemDescription.classList.add('item-description');
    itemDescription.textContent = product.description;

    const itemRating = document.createElement('div');
    itemRating.classList.add('item-rating');
    itemRating.textContent = `${product.rating}`;
    
    const itemIcon = document.createElement('div');
    itemIcon.classList.add('item-icon');
    
    const itemStars = document.createElement('div');
    itemStars.classList.add('stars');
    itemStars.style.display = 'flex';

    const ratingBox = document.createElement('div');
    ratingBox.classList.add('rating-box');
    ratingBox.appendChild(itemStars);
    ratingBox.appendChild(itemRating);
    ratingBox.style.display

    const filledStar = './images/orange-star.svg';
    const emptyStar = './images/grey-star.svg';

    const addEmptyStar = () => {
      const emptyStarElement = document.createElement('img');
      emptyStarElement.classList.add('star');
      emptyStarElement.src = emptyStar;
      itemStars.appendChild(emptyStarElement);
    }

    // Add stars according to rating
    if (product.rating >= 4.5) {
      for (let i = 0; i < 5; i++) {
        const star = document.createElement('img');
        star.classList.add('star');
        star.src = filledStar;
        itemStars.appendChild(star);
      }
    } else if (product.rating >= 3.5) {
      for (let i = 0; i < 4; i++) {
        const star = document.createElement('img');
        star.classList.add('star');
        star.src = filledStar;
        itemStars.appendChild(star);
      }
      addEmptyStar();
    } else if (product.rating >= 2.5) {
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
    itemBox.appendChild(itemTitle);
    itemBox.appendChild(itemPrice);
    itemBox.appendChild(discount);
    itemBox.appendChild(ratingBox);
    itemBox.appendChild(itemDescription);
    itemBox.appendChild(itemIcon);
    itemContainer.appendChild(itemBox);
  });
}
