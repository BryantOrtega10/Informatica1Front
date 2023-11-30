const BASE_URL = 'http://127.0.0.1:5000'
export const DUENO = `${BASE_URL}/dueno/`
export const LOGIN = `${BASE_URL}/dueno/login`
export const MASCOTAS = `${BASE_URL}/mascotas/`


export const postRequest = async (bodyData: any, ruta: string) => {
  try {
    const respuesta = await fetch(ruta,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : localStorage.getItem('api_token') || ''
      },
      body: JSON.stringify(bodyData),
    });
    const data = await respuesta.json();
    return data;
  } catch (error) {
    return error
  }
}

export const getRequest = async (ruta: string) => {
  try {
    const respuesta = await fetch(ruta,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : localStorage.getItem('api_token') || ''
      }
    });
    const data = await respuesta.json();
    return data;
  } catch (error) {
    return error
  }
}

export const putRequest = async (bodyData: any, ruta: string) => {
  try {
    const respuesta = await fetch(ruta,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : localStorage.getItem('api_token') || ''
      },
      body: JSON.stringify(bodyData),
    });
    const data = await respuesta.json();
    return data;
  } catch (error) {
    return error
  }
}


export const deleteRequest = async (ruta: string) => {
  try {
    const respuesta = await fetch(ruta,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : localStorage.getItem('api_token') || ''
      }
    });
    const data = await respuesta.json();
    return data;
  } catch (error) {
    return error
  }
}