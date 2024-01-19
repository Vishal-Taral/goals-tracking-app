import { Response } from 'express';

const invalidParameters = (reqQuery: Response, expectedParams: any) => {
  const unexpectedParams = Object.keys(reqQuery).filter(
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
