//Events Routes
//host + /api/events
const { Router } = require("express");
const { check } = require("express-validator");
const { jwtValidator } = require("../middlewares/jwt-validator");
const {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} = require("../controllers/events");

const router = Router();

router.use(jwtValidator);

router.get("/", getEvents);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
