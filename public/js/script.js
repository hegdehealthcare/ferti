// Handle form submission
document.getElementById('subscribeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const formMessage = document.getElementById('formMessage');
  const submitBtn = document.querySelector('.btn');

  // Reset message
  formMessage.textContent = '';
  formMessage.className = 'form-message';

  // Basic client-side validation
  if (!email) {
    formMessage.textContent = 'Please enter your email address.';
    formMessage.classList.add('error');
    return;
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.classList.add('error');
    return;
  }

  // Disable button during submission
  submitBtn.disabled = true;
  submitBtn.textContent = 'Subscribing...';

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      formMessage.textContent = '✅ ' + data.message;
      formMessage.classList.add('success');
      document.getElementById('email').value = '';
      
      // Update subscriber count
      updateSubscriberCount();
      
      // Reset button after 2 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Notify Me';
      }, 2000);
    } else {
      formMessage.textContent = '❌ ' + data.message;
      formMessage.classList.add('error');
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Notify Me';
    }
  } catch (error) {
    console.error('Error:', error);
    formMessage.textContent = '❌ Something went wrong. Please try again.';
    formMessage.classList.add('error');
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Notify Me';
  }
});

// Fetch and update subscriber count
async function updateSubscriberCount() {
  try {
    const response = await fetch('/api/subscribers-count');
    const data = await response.json();
    document.getElementById('subscriberCount').textContent = data.count;
  } catch (error) {
    console.error('Error fetching subscriber count:', error);
  }
}

// Load subscriber count on page load
document.addEventListener('DOMContentLoaded', updateSubscriberCount);

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
