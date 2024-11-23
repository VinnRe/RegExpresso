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

exports.visualizeNFA = catchAsync(async (req, res)=> {
  const { regEx } = req.body;
  if (!regEx) {
    return res.status(400).send('Regular expression is required');
  }

  try {
    const parser = new regParser.RegParser(regEx);
    const fsm = parser.parseToNFA();
    let dotScript = fsm.toDotScript();
    console.log(dotScript);
    
    return res.json({
      message: 'FSM visualized successfully',
      dotScript: dotScript
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

exports.visualizeDFA = catchAsync(async (req, res)=> {
  const { regEx } = req.body;
  if (!regEx) {
    return res.status(400).send('Regular expression is required');
  }

  try {
    const parser = new regParser.RegParser(regEx);
    const fsm = parser.parseToDFA();
    let dotScript = fsm.toDotScript();
    console.log(dotScript);
    
    return res.json({
      message: 'FSM visualized successfully',
      dotScript: dotScript
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

exports.to5Tuples = catchAsync(async (req, res) => {
  const { regEx } = req.body;

  if (!regEx) {
    return res.status(400).json({ error: 'Regular expression is required' });
  }

  try {
    const parser = new regParser.RegParser(regEx); // Initialize the parser with the regex
    const fsm = parser.parseToDFA(); // Parse the regex into a DFA
    const tuples = fsm.to5Tuple(); // Get the 5-tuple representation

    return res.json({
      message: 'FSM successfully converted to 5-tuple',
      tuples,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



