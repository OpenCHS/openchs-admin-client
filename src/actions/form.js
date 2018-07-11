export const BASIC_FORM = "basicForm";
export const FETCH_GROUPS = "fetchGroups";
export const FETCH_FORM = "fetchForm";
export const REQUEST_GROUPS = "requestGroups";
export default function updateBasicForm(name, formType, programName, encounterTypes) {
  return { type: BASIC_FORM, name, formType, programName, encounterTypes };
}
export function fetchGroups(formName, uuid, callback) {
  return (dispatch) => {
    
    dispatch(requestGroups(formName));

    return fetch(`/forms/export?formUUID=${uuid}`, {
      credentials: 'include',
      Accept: 'application/json',
      headers: { "ORGANISATION-NAME": "OpenCHS" }
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else if (response.status === 401 || response.status === 403) {
        window.location.pathname = '/';
        return null;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then((form) => {
      dispatch(updateBasicForm(form.name, form.formType, form.programName, form.encounterTypes))
      dispatch(receiveGroups(form));
      delete form.formElementGroups;
      dispatch(receiveForm(form));
      callback();
    })
    .catch((error) => {
      dispatch(receiveGroups({ formElementGroups: [] }));
      callback();
      console.log(error);
    });
  }
}

function receiveForm(form) {
  //const {formElementGroups, ...basicForm} = {form};
  console.log("basic form: " + JSON.stringify(form));
  //console.log("Just form: " + JSON.stringify(basicForm.form));
  return {
    type: FETCH_FORM,
    form,
    loading: false
  }
}

function receiveGroups(form) {
  return {
    type: FETCH_GROUPS,
    groups: form.formElementGroups,
    loading: false
  }
}

function requestGroups(formName) {
  return {
    type: REQUEST_GROUPS,
    form: formName,
    loading: true
  }
}