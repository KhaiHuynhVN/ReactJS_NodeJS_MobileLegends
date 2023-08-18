function SortMiddleWare(req, res, next) {
   // res.locals._storedVideoSort = {
   //    enable: false,
   //    type: 'default',
   //    key: '_storedVideoSort',
   // };

   res.locals._storedVideoSort = {
      enable: true,
      type: 'asc',
      column: 'createdAt',
      key: '_storedVideoSort',
   };

   res.locals._trashSort = {
      enable: true,
      type: 'asc',
      column: 'deletedAt',
      key: '_trashSort',
   };

   if (req.query.hasOwnProperty('_storedVideoSort')) {
      Object.assign(res.locals._storedVideoSort, {
         enable: true,
         type: req.query.type,
         column: req.query.column,
      });
   } else if (req.query.hasOwnProperty('_trashSort')) {
      Object.assign(res.locals._trashSort, {
         enable: true,
         type: req.query.type,
         column: req.query.column,
      });
   }

   next();
}

module.exports = SortMiddleWare;
