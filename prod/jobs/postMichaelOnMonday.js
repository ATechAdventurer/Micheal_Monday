"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postMondayMessage_1 = __importDefault(require("../logic/postMondayMessage"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const postMichaelOnMonday = {
    cron: "00 10 * * MON",
    run: async (bot) => {
        if (!(0, validateEnv_1.default)()) {
            return;
        }
        const { GUILD_ID, CHANNEL_ID } = process.env;
        if (!GUILD_ID || !CHANNEL_ID) {
            return;
        }
        await (0, postMondayMessage_1.default)(bot, GUILD_ID, CHANNEL_ID);
    },
    runOnInit: false,
};
exports.default = postMichaelOnMonday;
