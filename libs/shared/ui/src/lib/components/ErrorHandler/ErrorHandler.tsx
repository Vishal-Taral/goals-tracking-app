/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useState } from 'react';
import styles from './ErrorHandler.module.scss';

/* eslint-disable-next-line */
export interface ErrorHandlerProps {
  children: ReactNode
}
export interface ErrorHandlerState {
  error: any;
  errorInfo: any;
  hasError: boolean
}

export class ErrorHandler extends React.Component<ErrorHandlerProps, ErrorHandlerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      hasError: false,
    };
  }
  static getDerivedStateFromError(error: any): ErrorHandlerState {
    console.log('error', error)
    return { hasError: true, error: error, errorInfo: null };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('errorInfo', errorInfo)
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
          <textarea cols={25} rows={5} readOnly className={styles.message}>{this.state.error.toString()}</textarea>
        </div>
      );
    }
    return this.props.children;
  }
}
