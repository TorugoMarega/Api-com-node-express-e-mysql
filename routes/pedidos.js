const express = require('express');
const router = express.Router();

// retorna todos os pedidos
router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem: 'Retorna todos os pedidos'
    });
});

// insere (posta) um novo pedido
router.post('/', (req, res, next)=>{

    const pedido = {
      id_produto: req.body.id_produto,
      quantidade: req.body.quantidade  
    }

    res.status(201).send({
        mensagem: 'Pedido foi criado',
        pedidoCriado: pedido
    })

})



// retorna os dados de um produto
router.get('/:id_pedido',(req, res, next)=>{
    const id = req.params.id_pedido

        res.status(200).send({
            mensagem: 'Detalhes do pedido', 
            id_pedido: id
        });
})

//altera um pedido
router.patch('/', (req, res, next)=>{
    res.status(201).send({
        mensagem: 'Pedido alterado'
    })
})

//deleta um pedido
router.delete('/', (req, res, next)=>{
    res.status(201).send({
        mensagem: 'Pedido excluído'
    })
})

module.exports = router;