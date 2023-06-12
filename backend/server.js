const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const fastify = require('fastify')({ logger: false })

fastify.options('*', function (request, reply) {
    reply.send()
})

fastify.addHook('onSend', function (request, reply, payload, next) {
    reply.header('Access-Control-Allow-Origin', '*')
    reply.header('Access-Control-Allow-Headers', '*')
    next()
})

fastify.post('/register', async (req, res) => {
    const { username, password } = req.body

    try {
        await prisma.account.create({
            data: {
                username: username,
                password: password
            }
        })
    } catch (error) {
        return res.code(500).send({ msg: 'ผิดพลาด' })
    }
    return res.code(200).send({ msg: 'สำเร็จ' })
})

fastify.post('/product', async (req, res) => {
    const { name, desc, img, price } = req.body

    try {
        await prisma.product.create({
            data: {
                name: name,
                desc: desc,
                img: img,
                price: price
            }
        })
    } catch (error) {
        return res.code(500).send({ msg: 'ผิดพลาด' })
    }
    return res.code(200).send({ msg: 'สำเร็จ' })
})

fastify.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        return res.code(200).send(products);
    } catch (error) {
        return res.code(500).send({ msg: 'ผิดพลาด' });
    }
});

fastify.get('/accounts', async (req, res) => {
    try {
        const accounts = await prisma.account.findMany();
        return res.code(200).send(accounts);
    } catch (error) {
        return res.code(500).send({ msg: 'ผิดพลาด' });
    }
});

const start = async () => {
    try {
        await fastify.listen({ port: 3001 }).then(() => {
            console.log('Running @ http://localhost:3000/');
        })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()