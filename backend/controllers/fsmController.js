const catchAsync = require('../utils/catchAsync');
const regParser = require('../utils/regparser.js');

exports.parseNFA = catchAsync(async (req, res) => {
  const {regEx} = req.body;
  if (!regEx) {
    return res.status(400).send('Regular expression is required');
  }
  try{
    const parser = new regParser.RegParser(regEx);
    const fsm = parser.parseToNFA();  
    res.status(200).json({
      success: true,
      fsm,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

exports.parseDFA = catchAsync(async (req, res) => {
  const {regEx} = req.body;
  if (!regEx) {
    return res.status(400).send('Regular expression is required');
  }
  try{
    const parser = new regParser.RegParser(regEx);
    const fsm = parser.parseToDFA();  
    res.status(200).json({
      success: true,
      fsm,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

exports.visualizeFSM = catchAsync(async (req, res)=> {
  const { regEx } = req.body;
  if (!regEx) {
    return res.status(400).send('Regular expression is required');
  }

  try {
    const parser = new regParser.RegParser(regEx);
    const fsm = parser.parseToDFA();
    const dotScript = fsm.toDotScript();
    return res.json({
      message: 'FSM visualized successfully',
      dotScript
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


