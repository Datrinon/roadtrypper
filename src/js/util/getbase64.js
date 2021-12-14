/**
 * Get the base-64 equivalent of a file. Sourced from Andrey Kudriavtsev.
 * @url https://stackoverflow.com/questions/15960508/javascript-async-readasdataurl-multiple-files
 * 
 * @param {*} file 
 * @returns 
 */
export function getBase64(file) {
  const reader = new FileReader();

  return new Promise(resolve => {
    // only return once we have a result.
    reader.onload = e => {
      // e.target represents what the listener was assigned to
      // which in this case is the reader variable.
      resolve(e.target.result);
    }

    // do work
    reader.readAsDataURL(file);
  })
}