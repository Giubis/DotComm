const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

export function validateURL(url) {
  return urlRegex.test(url);
}
