import { Request, Response } from 'express';

const invalidParameters = ({ query }: Request, expectedParams: any) => {
  const unexpectedParams = Object.keys(query).filter(
    (param) => !expectedParams.includes(param)
  );

  if (unexpectedParams.length > 0) {
    return {
      isValid: false,
      invalidParams: unexpectedParams,
    };
  }
  return {
    isValid: true,
    invalidParams: unexpectedParams,
  };
};

export default invalidParameters;
