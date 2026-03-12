// Mysticloak - Product Detail Page Rendering

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-detail');
  if (!container) return;

  // Get slug from URL
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (!slug) {
    container.innerHTML = '<div class="empty-state">Product not found. <a href="shop.html" class="back-link">Back to Shop</a></div>';
    return;
  }

  const product = getProductBySlug(slug);

  if (!product) {
    container.innerHTML = '<div class="empty-state">Product not found. <a href="shop.html" class="back-link">Back to Shop</a></div>';
    return;
  }

  // Update page title
  document.title = product.name + ' | Mysticloak';

  // Get category display name
  const category = CATEGORIES.find(c => c.id === product.category);
  const categoryName = category ? category.name : product.category;

  // Build image gallery
  const hasImages = product.images && product.images.length > 0;
  const mainImageSrc = hasImages ? product.images[0] : '';

  let thumbnailsHTML = '';
  if (hasImages && product.images.length > 1) {
    thumbnailsHTML = '<div class="product-thumbnails">';
    product.images.forEach((img, i) => {
      thumbnailsHTML += `<div class="product-thumbnail${i === 0 ? ' active' : ''}" data-index="${i}">
        <img src="${img}" alt="${product.name}" onerror="this.parentElement.style.display='none'">
      </div>`;
    });
    thumbnailsHTML += '</div>';
  }

  // Stock status
  const stockHTML = product.inStock
    ? '<p class="stock-notice">In stock &mdash; ships within 3-5 business days</p>'
    : '<p class="stock-notice out-of-stock">Currently sold out</p>';

  const buyBtnClass = product.inStock ? 'btn primary' : 'btn primary disabled';
  const buyBtnText = product.inStock ? 'Buy Now' : 'Sold Out';

  container.innerHTML = `
    <div class="product-gallery">
      <div class="product-main-image">
        ${hasImages
          ? `<img src="${mainImageSrc}" alt="${product.name}" id="main-product-image" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="placeholder-icon" style="display:none">\u2726</div>`
          : '<div class="placeholder-icon">\u2726</div>'
        }
      </div>
      ${thumbnailsHTML}
    </div>
    <div class="product-info">
      <p class="product-category-label">${categoryName}</p>
      <h1 class="product-name">${product.name}</h1>
      <p class="product-price">${formatPrice(product.price)}</p>
      <p class="product-description">${product.description}</p>
      ${product.materials ? `
        <div class="product-materials">
          <h3>Materials</h3>
          <p>${product.materials}</p>
        </div>
      ` : ''}
      <div class="product-actions">
        <button class="btn primary" id="buy-now-btn" ${!product.inStock ? 'disabled' : ''} data-price-id="${product.stripePriceId}">
          ${buyBtnText}
        </button>
        ${stockHTML}
      </div>
    </div>
  `;

  // Thumbnail switching
  const thumbnails = container.querySelectorAll('.product-thumbnail');
  const mainImage = document.getElementById('main-product-image');

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.dataset.index);
      if (mainImage && product.images[index]) {
        mainImage.src = product.images[index];
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      }
    });
  });

  // Buy Now button
  const buyBtn = document.getElementById('buy-now-btn');
  if (buyBtn && product.inStock) {
    buyBtn.addEventListener('click', () => {
      if (typeof redirectToStripeCheckout === 'function') {
        redirectToStripeCheckout(product.stripePriceId);
      } else {
        alert('Payment system is being set up. Please check back soon!');
      }
    });
  }
});
