var playerState = {};

var scenes = {

  // ════════════════════════════════════════
  // PARKING LOT
  // ════════════════════════════════════════

  start: {
    img: "https://images.unsplash.com/photo-1767447613626-29f243f45348?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Trailhead",
    text: "You're at the base of the mountain. The sky looks clear, but the air feels heavy. You check your car's trunk. You have some emergency gear and some extra layers. It'll add about five pounds to your pack.",
    choices: [
      {
        text: "Pack the emergency gear. Better safe than sorry.",
        next: "mile_6",
        action: function () { playerState.hasGear = true; }
      },
      {
        text: "Travel light. You want to move fast today.",
        next: "mile_6",
        action: function () { playerState.hasGear = false; }
      }
    ]
  },

  // ════════════════════════════════════════
  // MILE 6
  // ════════════════════════════════════════

  mile_6: {
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop",
    title: "Mile 6",
    text: function () {
      if (playerState.hasGear) {
        return "The summit is about an hour ahead. Your heavy pack is starting to drag on you. Dark clouds are stacking up fast from the west, and the wind just picked up. You check your phone. No signal.";
      } else {
        return "The summit is about an hour ahead. Keeping your pack light means you aren't fatigued at all. Dark clouds are stacking up fast from the west, and the wind just picked up. You check your phone. No signal.";
      }
    },
    choices: [
      {
        text: "Push for the summit. You're so close.",
        next: function () { return playerState.hasGear ? "summit_survive" : "dead_summit"; }
      },
      { text: "Turn around. Get off the mountain before the storm.", next: "turn_back" }
    ]
  },

  // ── Conditional Summit Survival ──
  summit_survive: {
    img: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&h=300&fit=crop",
    title: "Caught in the Storm",
    text: "The storm hits before you reach the peak. Lightning cracks across the rock. But you have your emergency gear. You crawl into a deep crevice and wrap yourself in an emergency blanket. You're freezing and the night is long, but you're dry. By morning, the storm passes.",
    choices: [
      { text: "Head down the mountain as soon as it's light.", next: "aftermath" }
    ]
  },

  dead_summit: {
    img: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&h=300&fit=crop",
    title: "Exposed",
    dead: true,
    labelText: "DEAD END",
    text: "The storm hits. You have nothing to shield you from the wind and freezing rain. Your hands go numb immediately. Without any layers, your body temperature drops. You try to wait it out behind a rock, but the cold is too much. Search and rescue finds you the next morning. You didn't make it.",
    ending: true
  },

  // ════════════════════════════════════════
  // TURN BACK
  // ════════════════════════════════════════

  turn_back: {
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=300&fit=crop",
    title: "The Fork",
    text: "You turn around and move fast. Thirty minutes down, you hit a fork. The marked trail goes left (longer). To the right, an unmarked path cuts straight down the slope. It's steep but fast.",
    choices: [
      {
        text: "Take the shortcut. You need to beat this storm.",
        next: function () { return playerState.hasGear ? "shortcut_survive" : "dead_shortcut"; }
      },
      { text: "Stick to the marked trail. You know where it goes.", next: "marked_trail" }
    ]
  },

  // ── Conditional Shortcut Survival ──
  shortcut_survive: {
    img: "https://images.unsplash.com/photo-1664539069033-45b960463494?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A Bad Slide",
    text: "The shortcut is loose and wet. You slip and slide ten feet, slamming your knee against a boulder. You hear a loud pop. You can't put any weight on it. Because you have your emergency gear, you manage to stay warm while deciding what to do.",
    choices: [
      { text: "Wrap up in the emergency blanket and blow the rescue whistle.", next: "rescue_ending" },
      { text: "Snap some branches for crude crutches and try to hobble down.", next: "crutch_ending" }
    ]
  },

  rescue_ending: {
    img: "https://images.unsplash.com/photo-1634277248521-93343a10f4b2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Airlifted",
    labelText: "SURVIVED",
    text: "A group of hikers on the main trail hears your whistle, but seeing the extent of your blown-out knee and the worsening storm, they contact Search and Rescue. You're later airlifted out. It takes a major surgery and six months of physical therapy to walk normally again.",
    ending: true
  },

  crutch_ending: {
    img: "https://plus.unsplash.com/premium_photo-1664300505124-2500287eb7c3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Irreversible Damage",
    labelText: "SURVIVED",
    text: "You grit your teeth and drag your body down the mountain, using a branch to keep weight off your blown-out knee. By the time you reach the trailhead at dawn, the joint is completely pulverized. The doctor later tells you that you will likely walk with a slight limp for the rest of your life.",
    ending: true
  },

  dead_shortcut: {
    img: "https://images.unsplash.com/photo-1664539069033-45b960463494?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Loose Ground",
    dead: true,
    labelText: "DEAD END",
    text: "You slip and blow out your knee. You're off-trail and nobody can hear you. Without emergency gear, you spend the night shivering in the rain. By morning, you're too weak to call out.",
    ending: true
  },

  // ════════════════════════════════════════
  // MARKED TRAIL
  // ════════════════════════════════════════

  marked_trail: {
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=300&fit=crop",
    title: "Someone on the Trail",
    text: "You see a guy sitting on the ground. He looks about 50, holding a swollen ankle. He says his name is Glen. \"I can't put weight on it,\" he says. \"My wife is at the trailhead. I've got no signal.\" Rain is falling steadily now.",
    choices: [
      {
        text: "Stop. Help him up.",
        next: "help_hiker",
        action: function () { playerState.savedGlen = true; }
      },
      {
        text: "Tell him you'll send help. Keep moving.",
        next: "leave_hiker",
        action: function () { playerState.savedGlen = false; }
      }
    ]
  },

  help_hiker: {
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=300&fit=crop",
    title: "Two is Better",
    text: "You get his arm over your shoulder. It's slow. You reach the creek crossing. Normally it's ankle-deep. Today it's knee-high and moving fast, brown with mud.",
    choices: [
      { text: "Walk through. It doesn't look that deep.", next: function () { return playerState.hasGear ? "dead_river" : "river_survive_light"; } },
      { text: "Don't risk it. Find shelter and wait it out.", next: "shelter" }
    ]
  },

  dead_river: {
    img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=300&fit=crop",
    title: "Current",
    dead: true,
    labelText: "DEAD END",
    text: "You step in. The heavy emergency gear in your pack acts like an anchor, throwing off your balance. The swift current catches your legs and pulls you sideways. You go under. You try to pull yourself out, gasping for air, but you're soaked to the bone and freezing. You made a bad situation much worse.",
    ending: true
  },

  river_survive_light: {
    img: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=600&h=300&fit=crop",
    title: "Light On Your Feet",
    text: "You step in. The current catches your legs and pulls hard against you. However, because you traveled light and left the heavy emergency gear behind, your balance is perfect. You manage to keep your footing and cross safely to the other side.",
    choices: [
      { text: "Keep moving toward the trailhead.", next: "aftermath" }
    ]
  },

  shelter: {
    img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=300&fit=crop",
    title: "Making Camp",
    text: function () {
      var base = "You find a rock overhang. ";
      if (playerState.savedGlen) {
        if (playerState.hasGear) {
          base += "You pull out your emergency gear and wrap both of you in the foil blanket to share the warmth. ";
        } else {
          base += "Without any emergency gear, the two of you are forced to huddle closely together just to stave off the freezing rain. ";
        }
      } else {
        if (playerState.hasGear) {
          base += "You pull out your emergency foil blanket and wrap yourself up safely, staying perfectly dry and warm. ";
        } else {
          base += "Without any emergency gear or extra layers, you spend the night shivering violently, alone in the brutal cold. ";
        }
      }
      return base + "You sit there, watching lightning crack over the mountain. At first light, the creek has dropped.";
    },
    choices: [
      {
        text: function () {
          return playerState.savedGlen ? "Help Glen the last mile to the trailhead." : "Hike the last mile to the trailhead alone.";
        },
        next: "aftermath"
      }
    ]
  },

  leave_hiker: {
    img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=300&fit=crop",
    title: "The Creek",
    text: "You reach the creek alone. It's fast and deep. You don't have to worry about Glen, just yourself.",
    choices: [
      { text: "Walk through.", next: function () { return playerState.hasGear ? "dead_river" : "river_survive_light"; } },
      { text: "Don't risk the water alone. Find shelter and wait it out.", next: "shelter" }
    ]
  },

  // ════════════════════════════════════════
  // CONVERGED ENDING
  // ════════════════════════════════════════

  aftermath: {
    img: function () {
      if (playerState.savedGlen === true) {
        // Savior: A warm, hopeful sunrise over a mountain road
        return "https://images.unsplash.com/photo-1470246973918-29a93221c455?w=600&h=300&fit=crop";
      } else if (playerState.savedGlen === false) {
        // Sole Survivor: A person alone in the mountains
        return "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=300&fit=crop";
      } else {
        // The Survivor: An epic mountain landscape at dawn
        return "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=300&fit=crop";
      }
    },
    title: function () {
      if (playerState.savedGlen === true) return "Savior";
      if (playerState.savedGlen === false) return "Sole Survivor";
      return "The Survivor";
    },
    labelText: "SURVIVED",
    text: function () {
      var base = "You reach the trailhead at dawn. You're exhausted and soaked, but you're alive. ";
      if (playerState.savedGlen === true) {
        return base + "Glen's wife is there waiting. She hugs you with tears in her eyes. You didn't just survive; you made sure someone else did too.";
      } else if (playerState.savedGlen === false) {
        return base + "You tell the ranger about a guy named Glen. They send a team up. You later learn that they found his lifeless body on the ground.";
      } else {
        return base + "You walk to your car and sit for a long time, listening to the heater hum. You survived.";
      }
    },
    ending: true
  }
};

function show(id) {
  // If moving back to start, reset state
  if (id === 'start') {
    playerState = { hasGear: false, savedGlen: null };
  }

  var s = scenes[id];
  var el = document.getElementById("scene");
  var html = "";

  // Handle dynamic text and labels
  var sceneText = (typeof s.text === 'function') ? s.text() : s.text;
  var sceneLabel = (typeof s.labelText === 'function') ? s.labelText() : s.labelText;
  var sceneTitle = (typeof s.title === 'function') ? s.title() : s.title;
  var sceneImg = (typeof s.img === 'function') ? s.img() : s.img;

  html += '<img src="' + sceneImg + '" alt="' + sceneTitle + '">';
  html += '<div class="card-body">';

  if (s.ending) {
    if (s.dead) {
      html += '<span class="ending-label label-dead">' + sceneLabel + '</span>';
    } else {
      html += '<span class="ending-label label-good">' + sceneLabel + '</span>';
    }
  }

  html += '<h2 class="scene-title">' + sceneTitle + '</h2>';
  html += '<div class="scene-text">' + sceneText + '</div>';

  if (s.ending) {
    if (s.dead) {
      html += '<button class="play-again restart-dead" onclick="show(\'start\')">Start Over</button>';
    } else {
      if (s.reflection) html += '<div class="reflection">' + s.reflection + '</div>';
      html += '<button class="play-again" onclick="show(\'start\')">Play Again</button>';
    }
  } else {
    html += '<div class="choices">';
    for (var i = 0; i < s.choices.length; i++) {
      var c = s.choices[i];
      var cText = (typeof c.text === 'function') ? c.text() : c.text;
      html += '<button class="choice-btn" id="choice-' + i + '">' + cText + '</button>';
    }
    html += '</div>';
  }

  html += '</div>';
  el.innerHTML = html;

  // Re-attach event listeners
  if (!s.ending) {
    for (var i = 0; i < s.choices.length; i++) {
      (function (index) {
        var c = s.choices[index];
        var btn = document.getElementById('choice-' + index);
        if (btn) {
          btn.addEventListener('click', function () {
            if (c.action) c.action();
            var nextId = (typeof c.next === 'function') ? c.next() : c.next;
            show(nextId);
          });
        }
      })(i);
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

show("start");
