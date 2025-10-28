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
const { fieldsValidator } = require("../middlewares/fields-validator");
const { isDate } = require("../helpers/isDate");
const router = Router();

router.use(jwtValidator);

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Initial date is required").custom(isDate),
    check("end", "Final date is required").custom(isDate),
    fieldsValidator,
  ],

  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
