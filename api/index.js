import { Hono } from 'hono'
import leaderboard from '../db/leaderboard.json';

const app = new Hono();

app.get('/leaderboard', (ctx) => {
	return ctx.json(leaderboard);
})

app.get('/', (ctx) => {
	return ctx.json([
		{
			endpoint: "/leaderboard",
			description: "Return the leaderboard"
		}
	]);
})

export default app
