import $ from 'jquery';

export const login = (email, password, history, redirect) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/auth/signin',
      type: 'POST',
      data: ({ email, password })
    }).done( (res) => {
      let id = res.id;
      let token = getToken();
      sessionStorage.token = token;
      sessionStorage.userId = id;
      dispatch({ type: 'LOGIN', id, token });
      history.push(redirect);
      Materialize.toast('Login successful', 2000)
   }).fail( data => {
      Materialize.toast(data.responseText, 4000)
   });
  }
}

export const signup = (email, password, school, year, history, redirect) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/auth/signup',
      type: 'POST',
      data: { email, password, school, year }
    }).done( (res) => {
      let id = res.id
      let token = getToken();
      sessionStorage.token = token;
      sessionStorage.userId = id;
      dispatch({ type: 'LOGIN', id, token });
      history.push(redirect)
      Materialize.toast('Sign up successful', 2000)
    }).fail(data => {
      Materialize.toast(data.responseText, 4000)
    });
  }
};

export const logout = () => {
 sessionStorage.removeItem('userId');
 sessionStorage.removeItem('token');
 return { type: 'LOGOUT' };
};

export const setFilter = (category) => {
  return {
    type: 'SET_FILTER',
    category
  }
}

export const schoolItemFilter = (school) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/users/schools/items',
      type: 'GET',
      data: { school }
    }).done( school => {
      dispatch({ type: 'GET_SCHOOL', school })
    }).fail( data => {
      Materialize.toast(data.responseText, 3000)
    });
  }
}


const getToken = () => {
 return Math.random().toString(36).substring(7)
};

export const addItems = (text) => {
  return (dispatch) => {
    fetch('/api/items',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
      }
    )
    .then( res => res.json())
    .then( json => dispatch(item('ADD_ITEMS', json)))
  }
}

export const fetchItems = (id) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/items?userId=${id}`,
      type: 'GET'
    }).done( (items) => {
      dispatch(getItems(items));
    }).fail(data => {
      console.log(data);
    });
  }
}

export const searchItems = (search) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/items',
      type: 'GET'
    }).done( res => {
      let matches = []
      let regex = new RegExp(search, 'i')
      res.map( item => {
        if (regex.test(item.name) || 
            regex.test(item.category) ||
            regex.test(item.description) ||
            regex.test(item.condition)
        )
          matches.push(item)
      })

      dispatch({ type: 'GET_ITEMS', items: matches })
    }).done( res => {
      res.json;
    }).fail( res => {
      console.log('fail');
    })
  }
}


const getItems = (items) => {
  return {
    type: 'GET_ITEMS',
    items
  }
}

const item = (type, item) => {
  return {
    type: type,
    id: item._id,
    name: item.name,
    description: item.description,
    category: item.category,
    condition: item.condition,
    userId: item.userId,
    url: item.url
    
  }
}
