/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blocks for Maze game.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Maze.Blocks');

goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldImage');
goog.require('BlocklyGames');


/**
 * Common HSV hue for all movement blocks.
 */
Maze.Blocks.MOVEMENT_HUE = 290;

/**
 * HSV hue for loop block.
 */
Maze.Blocks.LOOPS_HUE = 120;

/**
 * Common HSV hue for all logic blocks.
 */
Maze.Blocks.LOGIC_HUE = 210;

/**
 * Left turn arrow to be appended to messages.
 */
Maze.Blocks.LEFT_TURN = ' \u21BA';

/**
 * Left turn arrow to be appended to messages.
 */
Maze.Blocks.RIGHT_TURN = ' \u21BB';

// Extensions to Blockly's existing blocks and JavaScript generator.

Blockly.Blocks['maze_moveForward'] = {
  /**
   * Block for moving forward.
   * @this {Blockly.Block}
   */
  init: function() {
      this.getMsg(BlocklyGames.getMsg('Maze_moveForward'))
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["Yellow","pegman_yellow"], ["Red","pegman_red"]]), "pegman")
          .appendField("moveForward");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Maze.Blocks.MOVEMENT_HUE);
      this.setTooltip(BlocklyGames.getMsg('Maze_moveForwardTooltip'));
      this.setHelpUrl("");
    
    // this.jsonInit({
    //   "message0": BlocklyGames.getMsg('Maze_moveForward'),
    //   "args0": [        {
    //     "type": "field_dropdown",
    //     "name": "pegman",
    //     "options": [
    //       [
    //         "Yellow",
    //         "pegman_yellow"
    //       ],
    //       [
    //         "Red",
    //         "pegman_red"
    //       ]
    //     ]
    //   }
    // ],
    //   "previousStatement": null,
    //   "nextStatement": null,
    //   "colour": Maze.Blocks.MOVEMENT_HUE,
    //   "tooltip": BlocklyGames.getMsg('Maze_moveForwardTooltip')
    // });
  }
};

Blockly.JavaScript['maze_moveForward'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'moveForward(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['maze_turn'] = {
  /**
   * Block for turning left or right.
   * @this {Blockly.Block}
   */
  init: function() {
    var DIRECTIONS =
        [[BlocklyGames.getMsg('Maze_turnLeft'), 'turnLeft'],
         [BlocklyGames.getMsg('Maze_turnRight'), 'turnRight']];
    // Append arrows to direction messages.
    DIRECTIONS[0][0] += Maze.Blocks.LEFT_TURN;
    DIRECTIONS[1][0] += Maze.Blocks.RIGHT_TURN;
    this.setColour(Maze.Blocks.MOVEMENT_HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Maze_turnTooltip'));
  }
};

Blockly.JavaScript['maze_turn'] = function(block) {
  // Generate JavaScript for turning left or right.
  var dir = block.getFieldValue('DIR');
  return dir + '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['maze_if'] = {
  /**
   * Block for 'if' conditional if there is a path.
   * @this {Blockly.Block}
   */
  init: function() {
    var DIRECTIONS =
        [[BlocklyGames.getMsg('Maze_pathAhead'), 'isPathForward'],
         [BlocklyGames.getMsg('Maze_pathLeft'), 'isPathLeft'],
         [BlocklyGames.getMsg('Maze_pathRight'), 'isPathRight']];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += Maze.Blocks.LEFT_TURN;
    DIRECTIONS[2][0] += Maze.Blocks.RIGHT_TURN;
    this.setColour(Maze.Blocks.LOGIC_HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendField(BlocklyGames.getMsg('Maze_doCode'));
    this.setTooltip(BlocklyGames.getMsg('Maze_ifTooltip'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['maze_if'] = function(block) {
  // Generate JavaScript for 'if' conditional if there is a path.
  var argument = block.getFieldValue('DIR') +
      '(\'block_id_' + block.id + '\')';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = 'if (' + argument + ') {\n' + branch + '}\n';
  return code;
};

Blockly.Blocks['maze_ifElse'] = {
  /**
   * Block for 'if/else' conditional if there is a path.
   * @this {Blockly.Block}
   */
  init: function() {
    var DIRECTIONS =
        [[BlocklyGames.getMsg('Maze_pathAhead'), 'isPathForward'],
         [BlocklyGames.getMsg('Maze_pathLeft'), 'isPathLeft'],
         [BlocklyGames.getMsg('Maze_pathRight'), 'isPathRight']];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += Maze.Blocks.LEFT_TURN;
    DIRECTIONS[2][0] += Maze.Blocks.RIGHT_TURN;
    this.setColour(Maze.Blocks.LOGIC_HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendField(BlocklyGames.getMsg('Maze_doCode'));
    this.appendStatementInput('ELSE')
        .appendField(BlocklyGames.getMsg('Maze_elseCode'));
    this.setTooltip(BlocklyGames.getMsg('Maze_ifelseTooltip'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['maze_ifElse'] = function(block) {
  // Generate JavaScript for 'if/else' conditional if there is a path.
  var argument = block.getFieldValue('DIR') +
      '(\'block_id_' + block.id + '\')';
  var branch0 = Blockly.JavaScript.statementToCode(block, 'DO');
  var branch1 = Blockly.JavaScript.statementToCode(block, 'ELSE');
  var code = 'if (' + argument + ') {\n' + branch0 +
             '} else {\n' + branch1 + '}\n';
  return code;
};

Blockly.Blocks['maze_forever'] = {
  /**
   * Block for repeat loop.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setColour(Maze.Blocks.LOOPS_HUE);
    this.appendDummyInput()
        .appendField(BlocklyGames.getMsg('Maze_repeatUntil'))
        .appendField(new Blockly.FieldImage(Maze.SKIN.marker, 12, 16));
    this.appendStatementInput('DO')
        .appendField(BlocklyGames.getMsg('Maze_doCode'));
    this.setPreviousStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Maze_whileTooltip'));
  }
};

Blockly.JavaScript['maze_forever'] = function(block) {
  // Generate JavaScript for repeat loop.
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'block_id_' + block.id + '\'') + branch;
  }
  return 'while (notDone()) {\n' + branch + '}\n';
};


Blockly.Blocks['maze_left_parallel'] = {
  /**
   * Block controls actions with selected pegman with left input
   * @this {Blockly.Block}
   */
  init: function() {
    this.setColour(Maze.Blocks.LOOPS_HUE);
    this.appendValueInput("pegman_person")
        .setCheck(null)
        .appendField("Parallel:")
        .appendField(new Blockly.FieldDropdown([["Pegman Yellow","pegman_1"], ["Pegman Red","pegman_2"]]), "parallel_person");
    this.appendStatementInput("parallel_actions")
        .setCheck(null);
    this.setOutput(true, null);
  }
};

Blockly.JavaScript['maze_left_parallel'] = function(block) {
  var dropdown_parallel_person = block.getFieldValue('parallel_person');
  var value_pegman_person = Blockly.JavaScript.valueToCode(block, 'pegman_person', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_parallel_actions = Blockly.JavaScript.statementToCode(block, 'parallel_actions');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};


Blockly.Blocks['maze_top_bot_parallel'] = {
  /**
   * Block controls actions with selected pegman with top and bottom input
   * @this {Blockly.Block}
   */
  init: function() {
    this.appendValueInput("parallel_person")
        .setCheck(null)
        .appendField("Parallel:")
        .appendField(new Blockly.FieldDropdown([["Pegman Yellow", "pegman_1"], ["Pegman Red", "pegman_2"]]), "pegman");
    this.appendStatementInput("parallel_action")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Maze.Blocks.LOOPS_HUE);
  }
};

Blockly.JavaScript['maze_top_bot_parallel'] = function(block) {
  var dropdown_pegman = block.getFieldValue('pegman');
  var value_parallel_person = Blockly.JavaScript.valueToCode(block, 'parallel_person', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_parallel_action = Blockly.JavaScript.statementToCode(block, 'parallel_action');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};