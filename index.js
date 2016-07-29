require("babel-core/register");

require.extensions['.scss'] =  () =>{
  return null;
};

require('./server/server.js');
