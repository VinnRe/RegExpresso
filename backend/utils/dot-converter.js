  var DOTSCRIPTHEADER = 'digraph finite_state_machine {rankdir = LR;';
  var DOTSCRIPTEND = '}';

  function escapeCharacter(token) {
    switch (token) {
      case ' ':
        return '[space]';
      case '\n':
        return '\n';
      case '\t':
        return '\t';
      case '\r':
        return '\r';
      case '\\':
        return '[\\]';
    }
    return token;
  }

  exports.toDotScript = function(fsm) {
    var transitionDotScript = '  node [shape = circle, color="#e8cdad"];'; // Add fill and edge colors here
    for (var from_id in fsm.transitions) {
      for (var to_id in fsm.transitions[from_id]) {
        transitionDotScript += '  ' + [from_id] + '->' + to_id + ' [label="' + escapeCharacter(fsm.transitions[from_id][to_id]) + '", color="#e8cdad", fontcolor="#e8cdad"];'; // Edge color
      }
    }

    var initialStatesDotScript = '';
    var initialStatesStartDotScript = '  node [shape = plaintext];';
    var acceptStatesDotScript = '';
    
    for (var i = 0; i < fsm.numOfStates; ++i) {
      if (fsm.acceptStates.indexOf(i.toString()) != -1) {
        acceptStatesDotScript += '  node [shape = doublecircle, color="#e8cdad",fontcolor="#e8cdad"]; ' + i + ';'; // Fill and edge colors for accept state
      }
      if (fsm.initialState == i.toString()) {
        initialStatesStartDotScript += '  "" -> ' + i + ' [label = "start", color="#e8cdad",fontcolor="#e8cdad"];'; // Edge color for start transition
        // accept is higher priority than initial state.
        if (fsm.acceptStates.indexOf(i.toString()) == -1)
          initialStatesDotScript += '  node [shape = circle, color="#e8cdad",fontcolor="#e8cdad"]; ' + i + ';'; // Fill and edge colors for regular nodes
      }
    }

    return DOTSCRIPTHEADER + initialStatesDotScript + acceptStatesDotScript +
        initialStatesStartDotScript + transitionDotScript + DOTSCRIPTEND;
  };
