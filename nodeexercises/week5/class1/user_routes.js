import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import { Router } from "express";
const user_router = Router();
// define a default route to retrieve all users
user_router.get("/", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    let users = await dbRtns.findAll(db, cfg.collection);
    res.status(200).send({ users: users });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
});

user_router.get("/:name", async (req, res) => {
  let name = req.params.name;
  try {
    let db = await dbRtns.getDBInstance();
    //let users = await dbRtns.findAll(db, cfg.collection);
    let user = await dbRtns.findOne(db, cfg.collection, { name });
    //console.log(user);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(500).send({ msg: "user not found" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(" internal server error");
  }
});

user_router.post("/", async (req, res) => {
  let user = req.body;
  console.log(user);
  try {
    let db = await dbRtns.getDBInstance();
    //let users = await dbRtns.findAll(db, cfg.collection);
    let users = await dbRtns.addOne(db, cfg.collection, user);
    res.status(200).send({ msg: "document added to users collection" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(" internal server error");
  }
});

user_router.put("/", async (req, res) => {
  let user = req.body;
  let msg;

  try {
    let db = await dbRtns.getDBInstance();
    let updateResults = await dbRtns.updateOne(
      db,
      cfg.collection,
      { name: user.name },
      { age: user.age, email: user.email }
    );
    updateResults.lastErrorObject.updatedExisting
      ? (msg = `user data ${updateResults.value.name} was updated`)
      : (msg = `user data was not updated`);
    res.status(200).send({ msg: msg });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
});
user_router.delete("/:name", async (req, res) => {
  let name = req.params.name;
  let msg;
  try {
    let db = await dbRtns.getDBInstance();
    let deleteResults = await dbRtns.deleteOne(db, cfg.collection, { name });
    deleteResults.deletedCount === 1
      ? (msg = `${deleteResults.deletedCount} user was deleted`)
      : (msg = `user not deleted or doesn't exest`);
    res.status(200).send({ msg: msg });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
});

export default user_router;
