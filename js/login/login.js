export const createLogin = () => {
  const app = document.getElementById('app');
  const section = document.createElement('section');
  const loginForm = document.createElement('form');
  const idInput = document.createElement('input');
  const passwordInput = document.createElement('input');
  const submitButton = document.createElement('button');

  section.id = '';
  loginForm.id = 'login-form';
  idInput.id = 'id-input';
  passwordInput.id = 'password-input';
  submitButton.id = 'submit-button';
  loginForm.classList = 'login-form';
  idInput.classList = 'id-input';
  passwordInput.classList = 'password-input';
  submitButton.classList = 'submit-button';

  app.appendChild(section);
};
