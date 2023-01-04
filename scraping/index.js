import * as cheerio from 'cheerio';

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

  $('table tbody tr').each((index, element) => {
    const rawTeam = $(element).find('.fs-table-text_3').text();
    const rawVictories = $(element).find('.fs-table-text_3').text();
    const rawLosed = $(element).find('.fs-table-text_3').text();
    const rawScoredGoals = $(element).find('.fs-table-text_3').text();
    const rawConcededGoals = $(element).find('.fs-table-text_3').text();
    const rawCardsYellow = $(element).find('.fs-table-text_3').text();
    const rawCardsRed = $(element).find('.fs-table-text_3').text();

    console.log(rawCardsRed);
  });
}

getLeaderBoard();




