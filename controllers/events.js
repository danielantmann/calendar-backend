const { response, request } = require("express");
const Event = require("../models/Event");

const getEvents = (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "getEvents",
  });
};

const createEvent = async (req = request, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const eventDB = await event.save();
    return res.status(201).json({
      ok: true,
      event: eventDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the admin",
    });
  }
};

const updateEvent = (req = request, res = response) => {
  return res.status(201).json({
    ok: true,
    msg: "updateEvents",
  });
};

const deleteEvent = (req = request, res = response) => {
  return res.status(201).json({
    ok: true,
    msg: "deleteEvents",
  });
};

module.exports = { createEvent, deleteEvent, getEvents, updateEvent };
