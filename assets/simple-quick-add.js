document.addEventListener('click', async (e) => {
  const button = e.target.closest('.simple-quick-add__button');
  if (!button) return;

  const form = button.closest('.simple-quick-add');
  const variantId = form.dataset.variantId;

  button.disabled = true;

  try {
    await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        id: variantId,
        quantity: 1,
      }),
    });

    button.classList.add('is-added');

    setTimeout(() => {
      button.classList.remove('is-added');
      button.disabled = false;
    }, 1500);

    // Optional: notify cart drawer / badge
    document.dispatchEvent(new CustomEvent('cart:refresh'));

  } catch (err) {
    console.error('Quick add failed', err);
    button.disabled = false;
  }
});
