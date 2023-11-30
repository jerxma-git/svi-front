// mocking backend api 

// TODO: request the actual backend

export const loginUser = async (credentials) => {
    if (credentials.username === 'uname' && credentials.password === 'pass') {
      return { success: true, token: 'le_tokem' };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };
 