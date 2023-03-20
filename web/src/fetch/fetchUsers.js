export const createUser = async (userInput) => {
   try {
      let response = await fetch(
         '/api/v1/auth/create-account',
         {
            method: 'post',
            body: JSON.stringify(userInput),
            headers: {
               'Content-Type': 'application/json'
            }
         }
      );
      //check if the login was successful
      console.log(response + " e okej");
      if (!response.ok) {
         throw new Error(response.statusText + " ne e okej");
      }
      let output = response.json();
      console.log(output);
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};

export const loginUser = async (data) => {
   try {
      let response = await fetch(
         '/api/v1/auth/login',
         {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
               'Content-Type': 'application/json'
            }
         }
      );
      // check if the fetch was successful   
      if (!response.ok) {
         return new Error(response.statusText);
      }

      let output = response.json();
      localStorage.setItem('user', JSON.stringify(output));
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};

export const fetchUser = async (token) => {
   try {
      let response = await fetch(
         '/api/v1/auth/user',
         {
            method: 'get',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token ? `Bearer ${token}` : ''
            }
         }
      );
      //check if the the fetch was successful
      if (!response.ok) {
         throw new Error(response.statusText);
      }

      let output = response.json();
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};

export const updateUser = async (data, token) => {
   try {
      let response = await fetch(
         '/api/v1/auth/update',
         {
            method: 'get',
            body: JSON.stringify(data),
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token ? `Bearer ${token}` : ''
            }
         }
      );
      //check if the the fetch was successful
      if (!response.ok) {
         throw new Error(response.statusText);
      }

      let output = response.json();
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};