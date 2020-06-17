import React from "react";
import ErrorPage from "./ErrorPage";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // TODO 에러 리포트 넣기
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
