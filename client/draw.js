Session.setDefault('pencilActive', true);
Session.setDefault('pencilSize', "medium");

// PHASE 1
// Set the default value of the session variable 'pencilColor' to "black"

Template.draw.rendered = (function () {
  var self = this;
  if (!self.canvas) {
    self.canvas = new fabric.Canvas("pictionary");
    self.canvas.setWidth(640);
    self.canvas.setHeight(480);
    self.autorun = Meteor.autorun(function () {
      self.canvas.isDrawingMode = Session.get('pencilActive');
      if (self.canvas.freeDrawingBrush) {
        self.canvas.freeDrawingBrush.width = {
          small: 1,
          medium: 4,
          large: 8
        }[Session.get('pencilSize')];
        // PHASE 1
        // Set the canvas's color to the value of the session variable 'pencilColor'
        // hint: self.canvas.freeDrawingBrush.color is the attribute in question
      }
    });
  }
});

Template.draw.destroyed = function () {
  var self = this;
  if (self.autorun)
    self.autorun.stop();
};


Template.draw.helpers({

  colors:function () {
    return [ "black", "red", "orange", "yellow", "green", "blue", "indigo", "violet", "white"];
  },


  pencilActive: function () {
    return activeIfTrue(Session.get('pencilActive'));
  },

  moveActive: function () {
    return activeIfTrue(!Session.get('pencilActive'));
  },

  lgActive: function () {
    return activeIfTrue(Session.equals('pencilSize', "large"));
  },

  medActive: function () {
    return activeIfTrue(Session.equals('pencilSize', "medium"));
  },

  smActive: function () {
    return activeIfTrue(Session.equals('pencilSize', "small"));
  }
});

Template.draw.events({
  'click .pencil': function () {
    Session.set('pencilActive', true);
  },
  'click .move': function () {
    Session.set('pencilActive', false);
  },
  'click .large': function () {
    Session.set('pencilSize', "large");
  },
  'click .medium': function () {
    Session.set('pencilSize', "medium");
  },
  'click .small': function () {
    Session.set('pencilSize', "small");
  },
  'click .remove': function (evt, templ) {
    if (templ.canvas && templ.canvas.getActiveObject()) {
      templ.canvas.remove(templ.canvas.getActiveObject());
    }
  }
});

// PHASE 1

// Make a template helper on Template.colorButton that returns "active" if the
// "pencilColor" Session variable is the same color as the button, and "" otherwise. (the word
// "active" is because the Twitter Bootstrap uses that class to activate
// elements in the UI)

// Hints:
// * See the activeIfTrue helper in util.js
// * Session.equals(sessionVarName, value) will help you
// * "this" will just be the string name of the color if you call toString() on it.

// PHASE 1

// Put an event handler on color buttons that sets the 'pencilColor' Session
// variable to that color when you click them.

// Remember that you can call this.toString()


// PHASE 5

// When we click #done on drawing, submit the canvas's object representation
// (call toObject() on it)

// note: see the submitAnswer helper in main.js
