/*
name: CustomSpeed
author: Shoffli
*/

const w = new KeyBind(17)
const a = new KeyBind(30)
const s = new KeyBind(31)
const d = new KeyBind(32)

var timer = Timer()
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
breeze.registerModule("CustomSpeed", "A customisable speed.", {
      speed: new DoubleSetting('Speed', 'The speed used.', 1, 0.5, 10),
      jump: BooleanSetting('Jump','Jumps when on ground.', false),
      motion: function(event) {
      speed = this.speed.getValue()*0.2805
      yaw = mc.getPlayer().getLastYaw()
      deg = ((yaw-360*Math.floor(yaw/360)))
      if (timer.hasPassed(500)) {
         //breeze.postNotification("[Test]","yaw: "+playeryaw+"\ncos: "+Math.cos(degrees_to_radians(playeryaw)))
         timer.reset()
      }
      var fb = 0
      var strafe = 0
      if (w.isDown() && !mc.isGuiOpen()) fb += 1
      if (s.isDown() && !mc.isGuiOpen()) fb -= 1
      if (a.isDown() && !mc.isGuiOpen()) strafe -= 1
      if (d.isDown() && !mc.isGuiOpen()) strafe += 1
      if (fb == 0 && strafe == 0){
         event.setX(0);
         event.setZ(0);
      }
      if (fb == 1 && strafe == 0){
         event.setX(-Math.sin(degrees_to_radians(deg))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg))*speed);
      }
      if (fb == -1 && strafe == 0){
         event.setX(-Math.sin(degrees_to_radians(deg+180))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+180))*speed);
      }
      if (fb == 1 && strafe == 1){
         event.setX(-Math.sin(degrees_to_radians(deg+45))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+45))*speed);
      }
      if (fb == 1 && strafe == -1){
         event.setX(-Math.sin(degrees_to_radians(deg-45))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg-45))*speed);
      }
      if (fb == -1 && strafe == 1){
         event.setX(-Math.sin(degrees_to_radians(deg+180-45))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+180-45))*speed);
      }
      if (fb == -1 && strafe == -1){
         event.setX(-Math.sin(degrees_to_radians(deg+180+45))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+180+45))*speed);
      }
      if (fb == 0 && strafe == 1){
         event.setX(-Math.sin(degrees_to_radians(deg+90))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+90))*speed);
      }
      if (fb == 0 && strafe == -1){
         event.setX(-Math.sin(degrees_to_radians(deg-90))*speed);event.setZ(Math.cos(degrees_to_radians(deg-90))*speed);
      }
    },
    tick: function() {
      if (mc.getPlayer().onGround() && !mc.isGuiOpen()&& this.jump.getValue() && (w.isDown() || a.isDown() || s.isDown() || d.isDown())) {
        player = mc.getPlayer()
        player.jump()
      }
    }
});
