import React, { Component } from 'react';

class ErrorBoundary extends Component {

    componentDidCatch(error, errorInfo){
       console.log("error: " ,error);
       console.log("error details: " ,errorInfo);
    }

    render() {
        return this.props.children
    }
}

export default ErrorBoundary;