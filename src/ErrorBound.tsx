import React from "react";
import ErrorPage from "./ErrorPage";
class ErrorBoundary extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error:any, info:any) {
    // Display fallback UI
    this.setState({ hasError: true });
    // TODO 에러 리포트 넣기
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
