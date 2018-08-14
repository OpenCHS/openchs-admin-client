import

  function withAxios(WrappedComponent) {
    class HOC extends React.Component {
      render() {
        const key = this.props.apiKey;
        const apiService = new ApiService({ key });

        return (
          <WrappedComponent
            {...this.props}
            apiService={apiService}
          />
        );
      }
    }
    return HOC;
  }

export default withAxios;