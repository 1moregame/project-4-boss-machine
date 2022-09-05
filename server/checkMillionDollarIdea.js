const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;
  const isMillionDollarIdea = numWeeks * weeklyRevenue >= 1000000;
  if (isMillionDollarIdea) {
    next();
  } else {
    return res.status(400).send();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
