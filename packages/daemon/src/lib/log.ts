// proxy to automatically add more time to each timeout
let timer_couter = 0;
const BASE_TIMING = 1200;

const timer = () => {
  timer_couter += 1;

  return BASE_TIMING * timer_couter;
};

export const log = <CallbackReturnValue>(
  message: string,
  callback?: () => CallbackReturnValue
): CallbackReturnValue => {
  // @ts-ignore: undefined is the default return value for a function without callback
  let returnValue: CallbackReturnValue = undefined;

  setTimeout(() => {
    console.log(message);
    if (callback) {
      returnValue = callback();
    }
  }, timer());

  return returnValue;
};
