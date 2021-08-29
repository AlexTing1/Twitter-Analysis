function getRetweets(data) {
  const result = [];

  for (let i = 0; i <= data.length; i += 1) {
    const currentText = data[i].text;
    const retweetTextArray = currentText.split(' ');
    if (retweetTextArray[0] === 'RT' && retweetTextArray[1][0] === '@') {
      result.push(data[i]);
    }
  }
  return result;
}

export default getRetweets;
