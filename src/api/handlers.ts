import { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

import statusCodes from './codes';

interface SuccessHandlerProps {
  response: AxiosResponse;
  options?: {
    notifyOnSuccess?: boolean;
    notifyOnFailed?: boolean;
  };
}

export const successHandler = ({
  response,
  options = {},
}: SuccessHandlerProps) => {
  const { data } = response;
  if (data && (data.code === 200 || data.code === 201)) {
    const message = response.data && data.message;
    const successText = message || statusCodes[response.status];

    if (options.notifyOnSuccess) {
      toast.success(successText, {
        duration: 5000,
      });
    }
  } else {
    const message = response.data && data.message;
    const errorText = message || statusCodes[response.status];
    if (options.notifyOnFailed) {
      toast.error(errorText, {
        duration: 5000,
      });
    }
  }
};

export const errorHandler = (error: any) => {
  const { response } = error;

  if (response && response.status) {
    const message = response.data && response.data.message;

    const errorText = message || statusCodes[response.status];
    toast.error(errorText, {
      duration: 10000,
    });
    // if (response.data && response.data.jwtExpired) {
    //   navigate('/logout');
    // }
    return response.data;
  } else {
    toast.error("Cannot connect to the server, Check your internet network", {
      duration: 10000,
    });
    return {
      success: false,
      result: null,
      message: "Cannot connect to the server, Check your internet network",
    };
  }
};
