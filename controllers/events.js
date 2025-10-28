const { response, request } = require("express");
/** @type {import("mongoose").Model<any>} */
const Event = require("../models/Event");

const getEvents = async (req = request, res = response) => {
  try {
    const events = await Event.find().populate("user", "name");

    return res.status(200).json({
      ok: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the admin",
    });
  }
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

const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "Even does not exists",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Unauthorized acces",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEventToDB = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: updatedEventToDB,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the admin",
    });
  }
};

const deleteEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    console.log(event);

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "Even does not exists",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Unauthorized acces",
      });
    }

    await Event.findByIdAndDelete(eventId, { new: true });

    res.status(201).json({
      ok: true,
      event: event,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the admin",
    });
  }
};

module.exports = { createEvent, deleteEvent, getEvents, updateEvent };
