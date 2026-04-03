export const validators = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword: (password: string): boolean => {
    // At least 8 characters, 1 number, 1 special char, 1 uppercase
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  passwordRequirements: {
    minLength: (password: string): boolean => password.length >= 8,
    hasNumber: (password: string): boolean => /\d/.test(password),
    hasSpecialChar: (password: string): boolean => /[@$!%*?&]/.test(password),
    hasUpperCase: (password: string): boolean => /[A-Z]/.test(password),
  },

  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  },

  isValidDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  },
};
