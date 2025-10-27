const { response, request } = require("express");

const getEvents = (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "getEvents",
  });
};

const createEvent = (req = request, res = response) => {
  return res.status(201).json({
    ok: true,
    msg: "createEvent",
  });
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
