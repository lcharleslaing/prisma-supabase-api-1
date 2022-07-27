const router = require('express').Router();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// BASE
router.get('/', async (req, res, next) => {
  try {
    res.send('Locations API is working!')
  } catch (error) {
    next(error)
  }
});

// GET Cities
router.get('/city', async (req, res, next) => {
  try {
    const cities = await prisma.City.findMany({
      include: {
        State: true,
      }
    })

    res.json({ cities })

  } catch (error) {
    next(error)
  }
});

// GET Counties
router.get('/county', async (req, res, next) => {
  try {

    const counties = await prisma.County.findMany({
      include: {
        _count: true,
        State: true,
        cities: true
      }
    })


    res.json({ counties })

  } catch (error) {
    next(error)
  }
});

// GET States
router.get('/state', async (req, res, next) => {
  try {

    const states = await prisma.State.findMany({
      include: {
        _count: true,
        counties: true,
        cities: true
      }
    })


    res.json({ states })

  } catch (error) {
    next(error)
  }
});


// POST State
router.post('/state', async (req, res, next) => {
  try {
    const state = await prisma.state.create({
      data: req.body
    })
    res.json(state)
  } catch (error) {
    next(error)
  }
});

// POST County
router.post('/county', async (req, res, next) => {
  try {
    const county = await prisma.county.create({
      data: req.body
    })
    res.json(county)
  } catch (error) {
    next(error)
  }
});

// POST City
router.post('/city', async (req, res, next) => {
  try {
    const city = await prisma.city.create({
      data: req.body
    })
    res.json(city)
  } catch (error) {
    next(error)
  }
});

// GET 1 Product by id
router.get('/city/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const city = await prisma.city.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        State: true,
        county: true
      }
    })
    res.json(city)
  } catch (error) {
    next(error)
  }
});

// DELETE CITY by id
router.delete('/city/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deleted_city = await prisma.city.delete({
      where: {
        id: Number(id)
      },
    })
    res.json(deleted_city)
  } catch (error) {
    next(error)
  }
});

// DELETE COUNTY by id
router.delete('/county/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deleted_county = await prisma.county.delete({
      where: {
        id: Number(id)
      },
    })
    res.json(deleted_county)
  } catch (error) {
    next(error)
  }
});

// DELETE STATE by id
router.delete('/state/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deleted_state = await prisma.state.delete({
      where: {
        id: Number(id)
      },
    })
    res.json(deleted_state)
  } catch (error) {
    next(error)
  }
});

// UPDATE CITY by id
router.patch('/city/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const updated_city = await prisma.city.update({
      data: req.body,
      where: {
        id: Number(id)
      },
    })
    res.json(updated_city)
  } catch (error) {
    next(error)
  }

});

// UPDATE COUNTY by id
router.patch('/county/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const updated_county = await prisma.county.update({
      data: req.body,
      where: {
        id: Number(id)
      },
    })
    res.json(updated_county)
  } catch (error) {
    next(error)
  }

});

// UPDATE STATE by id
router.patch('/state/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const updated_state = await prisma.state.update({
      data: req.body,
      where: {
        id: Number(id)
      },
    })
    res.json(updated_state)
  } catch (error) {
    next(error)
  }

});

module.exports = router;
