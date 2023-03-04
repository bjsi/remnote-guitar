export const loadScript = (file: string, type = 'text/javascript') => {
  const existingScript = document.querySelector(`script[src="${file}"]`);
  if (existingScript) {
    return Promise.resolve({ status: true });
  }
  return new Promise((resolve, reject) => {
    try {
      const scriptEle = document.createElement('script');
      scriptEle.type = type;
      scriptEle.src = file;

      scriptEle.addEventListener('load', (ev) => {
        resolve({ status: true });
      });

      scriptEle.addEventListener('error', (ev) => {
        reject({
          status: false,
          message: `Failed to load the script ＄{FILE_URL}`,
        });
      });

      document.body.appendChild(scriptEle);
    } catch (error) {
      reject(error);
    }
  });
};
