import React from "react";
declare class ErrorBoundary extends React.Component {
    constructor(props: any);
    componentDidCatch(error: any, info: any): void;
    render(): {} | null | undefined;
}
export default ErrorBoundary;
