import React from 'react';

export default class DebugForms extends React.Component {

  constructor(props) {
    super(props);

    let form = {};
    const localStorageForm = localStorage.getItem("currentForm");
    if (localStorageForm) {
      form = JSON.parse(localStorageForm);
    }
    this.state = { form: form };
  }

  componentDidMount() {
    window.onstorage = (ev) => {
      if (ev.key === "currentForm") {
        this.setState({ form: JSON.parse(ev.newValue) });
      }
    };
  }

  render() {
    return (
      <div><pre>{JSON.stringify(this.state.form, null, 2)}</pre></div>
    );
  }
}