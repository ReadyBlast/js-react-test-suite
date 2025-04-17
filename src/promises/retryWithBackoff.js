/* 
  Функция retryWithBackoff(fn, retries, delay) должна повторять вызов fn с 
  экспоненциальной задержкой (delay * 2^attempt), 
  пока fn не выполнится успешно или пока не исчерпаны попытки.
*/

export async function retryWithBackoff(fn, retries = 3, delay = 100) {
  // Пиши код здесь
}
