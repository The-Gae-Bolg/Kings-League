import * as cheerio from 'cheerio';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}

async function scrape(url) {
  const res = await fetch(url);
  const html = await res.text();
  return cheerio.load(html);
}

async function getLeaderBoard() {

  const $ = await scrape(URLS.leaderboard);
  const $raws = $('table tbody tr');

  const leaderboardSelectors = {
    teams: { selector: '.fs-table-text_3', typeOf: 'string'},
    victories: { selector: '.fs-table-text_4', typeOf : 'number'}, 
    losed: { selector: '.fs-table-text_5', typeOf : 'number'},
    scoredGoals: { selector: '.fs-table-text_6', typeOf : 'number'},
    concededGoals: { selector: '.fs-table-text_7', typeOf : 'number'},
    cardsYellow: { selector: '.fs-table-text_8', typeOf : 'number'},
    cardsRed: { selector: '.fs-table-text_9', typeOf : 'number'},
  }

  const cleanText = text => text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, ' ')
    .trim();

  const leaderboardSelectorsEntries = Object.entries(leaderboardSelectors);
  const leaderboard = [];

  $raws.each((index, element) => {
    const leaderboardEntries = leaderboardSelectorsEntries.map(([key, {selector , typeOf }]) => {
      const rawValue = $(element).find( selector ).text();
      const cleanValue = cleanText( rawValue );

      const value = typeOf === 'number'
        ? Number(cleanValue)
        : cleanValue;

      return [ key, value ]
    })

    leaderboard.push(Object.fromEntries(leaderboardEntries));

  });

  return leaderboard;
}

const leaderboard = await getLeaderBoard();
const filePath = path.join( process.cwd(), './db/leaderboard.json');

writeFile( filePath, JSON.stringify(leaderboard, null, 2), 'utf-8');




