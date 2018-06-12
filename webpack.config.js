/*************************************************************
 * AUTHOR : nanyuantingfeng DATE : 3/28/16 TIME : 18:08
 ************************************************************/
module.exports = async function (context) {

  context.babelOptions.plugins.push([
    'import', {style: true, libraryName: 'antd',}
  ]);

  context.entry = './test/app.js';

};
