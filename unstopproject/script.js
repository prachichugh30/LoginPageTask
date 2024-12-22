document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');
  
    if (localStorage.getItem('authToken') && window.location.pathname.includes('login.html')) {
      window.location.href = 'main.html'; 
    }
  
    if (loginForm) {
      loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
  
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const username = usernameInput.value.trim();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }
  
        if (password.length < 8) {
          alert('Password must be at least 8 characters.');
          return;
        }
  
        if (username !== 'emilys') {
          alert('Invalid username. Only "emilys" is allowed.');
          return;
        }
  
        try {
          const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
              email,
              expiresInMins: 30,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Login failed');
          }
  
          const data = await response.json();
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userData', JSON.stringify(data));
          window.location.href = 'main.html'; 
        } catch (error) {
          alert('Login failed. Please try again.');
          console.error(error);
        }
      });
    }
  

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        document.getElementById('userName').innerText = userData.username;
        document.getElementById('userEmail').innerText = userData.email;
      } else {
        window.location.href = 'login.html'; 
      }
  

      logoutButton.addEventListener('click', function () {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = 'login.html'; 
      });
    }
  });
  