// var WikiArticle = require('../models/wikiArticle.js');
// var VisitedArticle = require('../models/visitedArticle.js');

var recommend = function() {
  console.log('hey' );
};
// };
// router.get('/:topic', function(req, res) {
//   WikiArticle.findOne({
//     where: {
//       query: req.params.topic
//     }
//   })
//   .then(function(article) {
//     if(article && article.title !== req.params.topic) {
//       redirect(res, article.title);
//     }
//     else if(article) {
//       if(res.locals.user.username){
//         VisitedArticle.visitIfUnvisited(res.locals.user.username, article.title);
//       }
//       res.locals.article = "FROM DB"+article.content;
//       res.render("article");
//     } else {
//       queue(req, res);
//     }
//   });
// });
