'use strict'

const { User } = require('./models/User');

module.exports = router => {
  /**
   * Create a new User.
   */
  router.post('/AddUsers', async ctx => {
    console.log(ctx.request.body, "alaa");
    
    // insertGraph can run multiple queries. It's a good idea to
    // run it inside a transaction.
    const insertedGraph = await User.transaction(async trx => {
      const insertedGraph = await User.query(trx)
        .insertGraph(ctx.request.body)

      return insertedGraph
    })

    ctx.body = insertedGraph
  })

  /**
   * Fetch multiple Users.
   */
  router.get('/Users', async ctx => {
    const query = User.query()

    if (ctx.query.select) {
      query.select(ctx.query.select)
    }
    // query.debug();
    ctx.body = await query
  })

  /**
   * Update a single User.
   */
  router.patch('/Users/:id', async ctx => {
    const numUpdated = await User.query()
      .findById(ctx.params.id)
      .patch(ctx.request.body)

    ctx.body = {
      success: numUpdated == 1
    }
  })

  /**
   * Delete a User.
   */
  router.delete('/Users/:id', async ctx => {
    const numDeleted = await User.query()
      .findById(ctx.params.id)
      .delete()

    ctx.body = {
      success: numDeleted == 1
    }
  })

}
