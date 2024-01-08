import React, { useState } from 'react';
import styles from './ErrorHandler.module.scss';

/* eslint-disable-next-line */
export interface ErrorHandlerProps {}

export class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorHandler}>
          <div className={styles.message}>Error boundry message</div>
          <div className={styles.message}>{this.state.error.toString()}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
