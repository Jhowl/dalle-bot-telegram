import { Telegraf } from 'telegraf';
import { handleDalleCommand, handleDalleCommandEdit, handleDalleCommandVariation } from './dalle.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('generate', async ctx => {
  const imageUrl = await handleDalleCommand(ctx.message.text.split(' ').slice(1).join(' '));
  ctx.replyWithPhoto({ url: imageUrl });
});

bot.command('edit', async ctx => {
  const text = ctx.message.text.split(' ').slice(1).join(' ');
  const imageUrl = await handleDalleCommandEdit(text, ctx.message.photo[0].file_id, ctx.message.caption);
  ctx.replyWithPhoto({ url: imageUrl });
});

bot.command('variation', async ctx => {
  const imageUrl = await handleDalleCommandVariation(ctx.message.photo[0].file_id);
  ctx.replyWithPhoto({ url: imageUrl });
});

bot.launch();