var express = require('express')
var router = express.Router()

// gera a sessão a partir de informação recebida
router.get('/:user/:phobia/:model/:level/niveis', (req, res) => {
  lista_niveis = req.params.level.split("-")
  src = []
  url = []
  for(let i = 0; i < 5; i++){
    if (i < lista_niveis.length) {
      let l = i + 1
      src[i] = '/models/' + req.params.phobia + '/' + req.params.model + '/' + l + '/scene.glb'
      url[i] = '/markers/niveis/level' + l + '.patt'
    }
    else {
      let l = i + 1
      src[i] = '/models/mensagem.glb'
      url[i] = '/markers/niveis/level' + l + '.patt'
    }
  }
  // console.log(src)
  // console.log(url)
    res.render('render_session_niveis', {
      src1: src[0], url1: url[0],
      src2: src[1], url2: url[1],
      src3: src[2], url3: url[2],
      src4: src[3], url4: url[3],
      src5: src[4], url5: url[4],
    })
})

// gera a sessão a partir de informação recebida
router.get('/:user/:phobia/:model/:level/:marker', (req, res) => {
  res.render('render_session', {
    src: '/models/' + req.params.phobia + '/' + req.params.model + '/' + req.params.level + '/scene.glb',
    url: '/markers/' + req.params.marker + '.patt'
  })
})

module.exports = router;