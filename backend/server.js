// server.js
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { QUESTIONS, evaluateQualification } from "./dialog/flow.js";
import twilioPkg from "twilio";        // ✅ تغییر اینجاست
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const { twiml: Twiml } = twilioPkg;    // ✅ تغییر اینجاست

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = process.env.PORT || 3000;

// In-memory state for demo
const calls = new Map(); // callSid -> { step, answers, startedAt }
let BOT_ENABLED = true;
const kpis = { total: 0, answered: 0, qualified: 0, transferred: 0 };
const logs = []; // newest first

function newCallState(callSid) {
  const state = { step: 0, answers: {}, startedAt: Date.now(), id: callSid };
  calls.set(callSid, state);
  return state;
}

function logEvent(e) {
  logs.unshift({ id: uuidv4(), at: new Date().toISOString(), ...e });
  if (logs.length > 5000) logs.pop();
}

// Twilio webhook entry
app.post("/voice/incoming", (req, res) => {
  const response = new Twiml.VoiceResponse();

  if (!BOT_ENABLED) {
    response.say("Our bot is currently offline. Please call later.");
    return res.type("text/xml").send(response.toString());
  }

  const callSid = req.body.CallSid || uuidv4();
  let state = calls.get(callSid) || newCallState(callSid);

  // Count KPIs
  if (state.step === 0) {
    kpis.total += 1;
    kpis.answered += 1;
    logEvent({ type: "call_started", callSid });
  }

  const userSpeech = (req.body.SpeechResult || req.body.Digits || "").toString();

  // If we have a previous answer, store it
  if (state.step > 0) {
    const prevQ = QUESTIONS[state.step - 1];
    if (prevQ) {
      state.answers[prevQ.key] = userSpeech || state.answers[prevQ.key] || "";
    }
  }

  // If we've asked all questions, evaluate
  if (state.step >= QUESTIONS.length) {
    const evalRes = evaluateQualification(state.answers);
    if (evalRes.qualified) {
      kpis.qualified += 1;
      logEvent({ type: "qualified", callSid, score: evalRes.score, answers: state.answers });

      // Warm transfer
      const target = process.env.CLOSER_NUMBER || "+11234567890";
      response.say("Great. Please hold while I connect you to a licensed specialist.");
      const dial = response.dial({ callerId: req.body.To || "", record: "record-from-answer" });
      dial.number(target);
      kpis.transferred += 1;
      logEvent({ type: "transferred", callSid, to: target });
    } else {
      response.say("Thanks for your time. You do not meet our criteria at the moment. Goodbye.");
      logEvent({ type: "not_qualified", callSid, answers: state.answers });
    }
    calls.delete(callSid);
    return res.type("text/xml").send(response.toString());
  }

  // Ask next question
  const nextQ = QUESTIONS[state.step];
  const gather = response.gather({
    input: "speech dtmf",
    numDigits: 1,
    speechTimeout: "auto",
    action: "/voice/incoming",
    method: "POST"
  });
  gather.say(nextQ.text);
  state.step += 1;
  calls.set(callSid, state);
  return res.type("text/xml").send(response.toString());
});

// --- Simple API for dashboard ---
app.get("/api/kpis", (_req, res) => res.json(kpis));
app.get("/api/logs", (_req, res) => res.json(logs));
app.get("/api/bot", (_req, res) => res.json({ enabled: BOT_ENABLED }));
app.post("/api/bot", (req, res) => {
  BOT_ENABLED = !!req.body.enabled;
  logEvent({ type: "bot_toggled", enabled: BOT_ENABLED });
  res.json({ ok: true, enabled: BOT_ENABLED });
});

// Simulate N calls for demo
app.post("/api/simulate", (req, res) => {
  const n = Math.min(200, Math.max(1, Number(req.body.count) || 20));
  for (let i = 0; i < n; i++) {
    kpis.total += 1;
    kpis.answered += 1;
    const callSid = uuidv4();
    const answers = {
      decision_maker: Math.random() > 0.2 ? "Yes" : "No",
      has_coverage: Math.random() > 0.5 ? "No" : "Yes",
      age_bracket: ["under 50", "50–65", "66 and above"][Math.floor(Math.random() * 3)],
      health_flag: Math.random() > 0.9 ? "Yes" : "No",
      state: "CA",
      callback_time: "afternoon",
      transfer_consent: Math.random() > 0.4 ? "Yes" : "No"
    };
    const { qualified, score } = evaluateQualification(answers);
    if (qualified) {
      kpis.qualified += 1;
      kpis.transferred += 1;
      logEvent({ type: "qualified", callSid, score, answers });
      logEvent({ type: "transferred", callSid, to: process.env.CLOSER_NUMBER || "+11234567890" });
    } else {
      logEvent({ type: "not_qualified", callSid, answers });
    }
  }
  res.json({ ok: true, added: n });
});

app.listen(PORT, () => {
  console.log(`Backend listening on :${PORT}`);
});
