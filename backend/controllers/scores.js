const _calculate = (score) => {
  const charset = [3, 6, 7];
  const results = [];
  for (let i = 0; i <= score; i++) {
    for (let j = 0; j < charset.length; j++) {
      const c = charset[j];
      if (i < c) {
        continue;
      } else if (i === c) {
        results[i] = results[i] ? [...results[i], [c]] : [[c]];
      } else {
        const prevouis_comb = results[i - c];
        const new_result = [];
        if (!prevouis_comb) continue;
        prevouis_comb.forEach((e) => {
          new_result.push([...e, c]);
        });
        results[i] = results[i] ? [...results[i], ...new_result] : new_result;
      }
    }
  }
  return results[score];
};

const combineResults = (p_of_scoreX, p_of_scoreY) => {
  const result = [];
  for (let i = 0; i < p_of_scoreX.length; i++) {
    for (let j = 0; j < p_of_scoreY.length; j++) {
      result.push({
        teamX: p_of_scoreX[i],
        teamY: p_of_scoreY[j],
      });
    }
  }
  return result;
};

const calculate = (req) => {
  const { scoreX, scoreY } = req.body;
  const Xmax = req.app.get('maxX');
  const Ymax = req.app.get('maxY');

  if (!scoreX || !scoreY)
    return { error: 'Please Provide both scoreX and scoreY !' };
  if (scoreX > Xmax || scoreY > Ymax)
    return { error: 'Scores exceed API limit !' };

  const result = combineResults(_calculate(scoreX), _calculate(scoreY));
  return result;
};

module.exports = { calculate };
