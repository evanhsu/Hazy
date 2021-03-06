module.exports = p => `
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="/static/css/main.css.gz">

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta property="og:url" content="https://${process.env.DOMAIN}${p.request.url}" />
        <meta property="og:title" content="${ p.title }" />
        <meta property="og:description" content="Everything disc golf related." />
        <meta property="og:image" content="https://${process.env.DOMAIN}/static/img/hazy-tree.png" />
        <meta property="og:type" content="article" />
 
        ${ ( p.isDev )
            ? '<script src="/static/js/debug.js.gz"></script>'
            : '<script src="/static/js/bundle.js.gz"></script>'
        }      

        <title>${p.title}</title>

    </head>

    <body>
        <div id="content"></div>
    </body>

    ${p.isDev?`<script src="//${process.env.DOMAIN}:35729/livereload.js?snipver=1"/></script>`:''}

</html>
`
