// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (response: any): string => {
  if (response.error) {
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0]);
    }
    return formatErrorMessage(response.message);
  }

  return 'Unknown error occured';
};

const formatErrorMessage = (message: string): string => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};
