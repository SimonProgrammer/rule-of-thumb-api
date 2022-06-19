import { Router } from "express";
import { PersonModel, IPerson, IPersonVote } from "../models/person";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const persons: IPerson[] = await PersonModel.find().exec();
    return res.json(persons);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.put("/", async (req, res) => {
  try {
    const filter: IPersonVote = req.body;

    const personExists = await PersonModel.findOne({
      code: filter.code,
    }).exec();

    if (!personExists) {
      return res
        .status(409)
        .json({ error: "Person dont exist" });
    }

    if(filter.type === 'positive'){
        personExists.votes.positive += 1;
    }
    else{
        personExists.votes.negative += 1;
    }
    personExists.lastUpdated = new Date();

    await personExists.save();
    return res.status(201).json({
        status: 'vote registered'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

export default routes;
