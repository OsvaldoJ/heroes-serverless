import containers from './config';
const { heroes: container } = containers;

async function getHeroes(context) {
  const { req, res } = context;

  try {
    const { result: heroes } = await container.items.readAll().toArray();
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function postHero(context) {
  const { req, res } = context;

  const hero = {
    name: req.body.name,
    description: req.body.description,
    id: undefined
  };
  hero.id = `Hero${hero.name}`;

  try {
    const { body } = await container.items.create(hero);
    res.status(201).json(body);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function putHero(context) {
  const { req, res } = context;

  const hero = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description
  };

  try {
    const { body } = await container.items.upsert(hero);
    res.status(200).json(body);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteHero(context) {
  const { req, res } = context;
  
  const { id } = req.params;

  try {
    const { body } = await container.item(id).delete();
    res.status(200).json(body);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default { getHeroes, postHero, putHero, deleteHero };
