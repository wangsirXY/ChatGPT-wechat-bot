/**
  * @description 工具模块
  * @author GuAn
  * @time 2023-03-30 15:57:39
  */

/**
 * 睡眠方法
 * @param time 等待时间，单位毫秒
 * @returns
 */
const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/**
 * 等待错误
 * @param promise 请求方法
 * @returns [失败信息, 成功信息] 如果没有数据，则为 null
 */
const awaitErrorWrap = async <T, U = any>(
  promise: Promise<T>
): Promise<[U | null, T | null]> => {
  try {
    // 成功数据
    const data = await promise;
    return [null, data];
  } catch (err: any) {
    // 错误信息
    return [err, null];
  }
};

/**
 * 请求方法（包含重试）
 *  - 请求成功则会
 * @param promise 请求方法
 * @param retryTimes 重试次数
 * @param retryInterval 重试间隔时间
 * @returns
 */
export const retryRequest = async <T>(
  promise: () => Promise<T>,
  retryTimes = 3,
  retryInterval = 10000
) => {
  // 保存请求结果
  let output: [any, T | null] = [null, null];

  // 循环重试次数
  for (let a = 0; a < retryTimes; a++) {
    output = await awaitErrorWrap(promise());

    // 请求成功，output[1] 保存数据
    if (output[1]) {
      break;
    }

    // 打印错误
    console.log(`retry ${a + 1} times, error: ${output[0]}`);
    await sleep(retryInterval);
  }

  // 请求失败，output[0] 保存错误信息
  if (output[0]) {
    throw output[0];
  }

  // 返回成功数据
  return output[1];
};
