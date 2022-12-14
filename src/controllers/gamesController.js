import db from "../database.js";
export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  if (parseInt(stockTotal) < 1 || parseInt(pricePerDay) < 1) {
    return res.sendStatus(400);
  }
  try {
    const { rows: checkDuplicate } = await db.query(
      `
      SELECT *
      FROM games
      WHERE (name = $1)
      `,
      [name]
    );
    if (checkDuplicate.length > 0) {
      return res.status(409).send("Jogo já existe");
    }
    await db.query(
      `
      INSERT INTO
      games (name, image, "stockTotal", "categoryId", "pricePerDay")
      VALUES ($1, $2, $3, $4, $5)
      `,
      [name, image, parseInt(stockTotal), categoryId, parseInt(pricePerDay)]
    );
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}
export async function getGames(req, res) {
  const { name } = req.query;
  try {
    if (name !== undefined) {
      const { rows: filteredGames } = await db.query(
        `
         SELECT
            games.*,
            categories.name AS "categoryName"
         FROM games
         JOIN categories ON games."categoryId"=categories.id
         WHERE LOWER(games.name)
         LIKE LOWER($1)
       `,
        [`${name}%`]
      );
      res.send(filteredGames);
    } else {
      const { rows: games } = await db.query(
        `
         SELECT
            games.*,
            categories.name AS "categoryName"
         FROM games
         JOIN categories
         ON games."categoryId"=categories.id
         `
      );
      res.send(games);
    }
  } catch {
    res.sendStatus(500);
  }
}
