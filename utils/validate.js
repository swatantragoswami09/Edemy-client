export const validateName = (input) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(input);
  };


export const validateEmail = (input) => {
    // Standard email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
  

 export  const validatePassword = (input) => {
    const conditions = [
      { regex: /(?=.*[A-Z])/, message: "at least one uppercase letter" },
      { regex: /(?=.*[a-z])/, message: "at least one lowercase letter" },
      { regex: /(?=.*\d)/, message: "at least one digit" },
      {
        regex: /(?=.*\W)/,
        message: "at least one non-alphanumeric character",
      },
      {
        regex: /(?=.*[A-Z][a-z])/,
        message: "at least one alphabet in uppercase",
      },
    ];
   

    for (const condition of conditions) {
      if (!condition.regex.test(input)) {
        toast.error(`Password must contain ${condition.message}`);
        return false;
      }
    }

    // Password must be at least 6 characters long (update this message)
    if (input.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    // All conditions met
    return true;
  };
  

  
 
  