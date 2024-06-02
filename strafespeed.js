/*
name: strafespeed
author: Shoffli, Wallhacks and Tygozegthoi for the trigonometry
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
breeze.registerModule("Test", "Test.", {
      w: new KeyBindSetting("forward","what key to use for forward"),
      s: new KeyBindSetting("backward","what key to use for backward"),
      a: new KeyBindSetting("left","what key to use for left"),
      d: new KeyBindSetting("right","what key to use for right"),
      speedtest: new DoubleSetting('Speedtest', 'Salalalla.', 1, 1, 10),
      motion: function(event) {
      var sprinting = 0
      if (mc.getPlayer().isSprinting()) sprinting = 1
      speed = (this.speedtest.getValue()*0.2805)
      yaw = mc.getPlayer().getLastYaw()
      deg = ((yaw-360*Math.floor(yaw/360)))
      var fb = 0
      var strafe = 0
      if (this.w.getValue().isDown()) fb += 1
      if (this.s.getValue().isDown()) fb -= 1
      if (this.a.getValue().isDown()) strafe -= 1
      if (this.d.getValue().isDown()) strafe += 1
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
         event.setX(-Math.sin(degrees_to_radians(deg-90))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg-90))*speed);
      }
    }
});
