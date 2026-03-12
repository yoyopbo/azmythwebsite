// Mysticloak - Shop Grid Rendering & Category Filtering

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('products-grid');
  const filterBar = document.getElementById('filter-bar');

  if (!grid) return;

  let activeCategory = 'all';

  // Render category filter buttons
  function renderFilters() {
    if (!filterBar) return;
    filterBar.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (cat.id === activeCategory ? ' active' : '');
      btn.textContent = cat.name;
      btn.addEventListener('click', () => {
        activeCategory = cat.id;
        renderFilters();
        renderProducts();
      });
      filterBar.appendChild(btn);
    });
  }

  // Render product cards
  function renderProducts() {
    const products = getProductsByCategory(activeCategory);
    grid.innerHTML = '';

    if (products.length === 0) {
      grid.innerHTML = '<div class="empty-state">No products found in this category.</div>';
      return;
    }

    products.forEach(product => {
      const card = document.createElement('a');
      card.href = 'product.html?slug=' + product.slug;
      card.className = 'product-card' + (!product.inStock ? ' out-of-stock' : '');

      const hasImage = product.images && product.images.length > 0;

      card.innerHTML = `
        <div class="product-card-image">
          ${hasImage
            ? `<img src="${product.images[0]}" alt="${product.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="placeholder-icon" style="display:none">\u2726</div>`
            : '<div class="placeholder-icon">\u2726</div>'
          }
        </div>
        <div class="product-card-info">
          <h3 class="product-card-name">${product.name}</h3>
          <p class="product-card-desc">${product.shortDescription}</p>
          <p class="product-card-price">${formatPrice(product.price)}</p>
        </div>
      `;

      grid.appendChild(card);
    });

    // Apply fade-in animation
    requestAnimationFrame(() => {
      grid.querySelectorAll('.product-card').forEach(card => {
        card.classList.add('fade-in-element');
      });
      requestAnimationFrame(() => {
        grid.querySelectorAll('.product-card').forEach(card => {
          card.classList.add('fade-in-visible');
        });
      });
    });
  }

  renderFilters();
  renderProducts();
});
