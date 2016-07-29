import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Firebase from 'firebase';
import Main from '../../app/components/Main.jsx';

export default function(app) {

  const ReactApp = React.createFactory(Main);

  app.get('/:admin?', (req, res) => {
    var isAdmin = req.params.admin ? true : false;
    var isDev = process.env.NODE_ENV !== 'production';
    var reactHtml = ReactDOMServer.renderToString(ReactApp({data: {admin: isAdmin}}));
    res.render('index', {
      html: reactHtml,
      data: JSON.stringify({admin: isAdmin}),
      jsHash: isDev ? 'http://localhost:5000/assets/main.js' : '/assets/main.js',
      cssHash: isDev ? 'http://localhost:5000/assets/main.css' : '/assets/main.css',

    });
  });

  app.post('/new', (req, res) => {
    var body = req.body;
    if(body) {
      var myFirebaseRef = new Firebase("https://sabeur-links.firebaseio.com/links");

      myFirebaseRef.push({
        url: body.url,
        title: body.title,
        created_at: new Date().getDate()
      }, (err) =>{
        if(err) {
          res.json({sucess: false, error: err}, 404);
        } else {
          res.json({sucess: true}, 200);
        }
      });
    }

  });
}
