// method: number, string, time
// towards: asc, desc
function sortLibrary(array, method, towards, key) {
   if (towards === 'asc') {
      switch (method) {
         case 'number':
            if (key) {
               array.sort((a, b) => {
                  return a[key] - b[key];
               });
               return array;
            }
            array.sort((a, b) => {
               return a - b;
            });
            return array;
         case 'string':
            if (key) {
               array.sort((a, b) => {
                  return a[key].localeCompare(b[key]);
               });
               return array;
            }
            array.sort((a, b) => {
               return a.localeCompare(b);
            });
            return array;
         case 'time':
            if (key) {
               array.sort((a, b) => {
                  return new Date(a[key]) - new Date(b[key]);
               });
               return array;
            }
            array.sort((a, b) => {
               return new Date(a) - new Date(b);
            });
            return array;
         default:
            throw new Error('Invalid method. You only use: "number', 'string', 'time');
      }
   } else if (towards === 'desc') {
      switch (method) {
         case 'number':
            if (key) {
               array.sort((a, b) => {
                  return b[key] - a[key];
               });
               return array;
            }
            array.sort((a, b) => {
               return b - a;
            });
            return array;
         case 'string':
            if (key) {
               array.sort((a, b) => {
                  return b[key].localeCompare(a[key]);
               });
               return array;
            }
            array.sort((a, b) => {
               return b.localeCompare(a);
            });
            return array;
         case 'time':
            if (key) {
               array.sort((a, b) => {
                  return new Date(b[key]) - new Date(a[key]);
               });
               return array;
            }
            array.sort((a, b) => {
               return new Date(b) - new Date(a);
            });
            return array;
         default:
            throw new Error('Invalid method. You only use: "number', 'string', 'time');
      }
   } else {
      throw new Error('Invalid towards. You only use: "asc', 'desc');
   }
}

export default sortLibrary;
