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
      speedtest: new DoubleSetting('Speedtest', 'Salalalla.', 1, 1, 10),
      alwayssprint: BooleanSetting('multidirectional sprint','sprints in multiple directions when not posible',false),
      sendsprint: BooleanSetting('multidirectional sprint sending','sends sprint packets when going in multiple directions even though it is not posible',false),
      motion: function(event) {
      var sprinting = 0
      if (mc.getPlayer().isSprinting()) sprinting = 1
      speed = (this.speedtest.getValue()*0.21585)
      forwardspeed = (this.speedtest.getValue()*0.2805)
      if (this.alwayssprint.getValue()) speed = forwardspeed
      yaw = mc.getPlayer().getLastYaw()
      deg = ((yaw-360*Math.floor(yaw/360)))
      var fb = 0
      var strafe = 0
      if (w.isDown()) fb += 1
      if (s.isDown()) fb -= 1
      if (a.isDown()) strafe -= 1
      if (d.isDown()) strafe += 1
      if (fb == 0 && strafe == 0){
         event.setX(0);
         event.setZ(0);
      }
      if (fb == 1 && strafe == 0){
          mc.getPlayer().setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg))*forwardspeed);
         event.setZ(Math.cos(degrees_to_radians(deg))*forwardspeed);
      }
      if (fb == -1 && strafe == 0){
        if (this.sendsprint.getValue()) mc.getPlayer().setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg+180))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+180))*speed);
      }
      if (fb == 1 && strafe == 1){
        mc.getPlayer().setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg+45))*forwardspeed);
         event.setZ(Math.cos(degrees_to_radians(deg+45))*forwardspeed);
      }
      if (fb == 1 && strafe == -1){
        mc.getPlayer().setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg-45))*forwardspeed);
         event.setZ(Math.cos(degrees_to_radians(deg-45))*forwardspeed);
      }
      if (fb == -1 && strafe == 1){
        if (this.sendsprint.getValue()) mc.getPlayer().setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg+180-45))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+180-45))*speed);
      }
      if (fb == -1 && strafe == -1){
        if (this.sendsprint.getValue()) mc.getPlayer().setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg+180+45))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+180+45))*speed);
      }
      if (fb == 0 && strafe == 1){
        if (this.sendsprint.getValue()) mc.getPlayer().setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg+90))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+90))*speed);
      }
      if (fb == 0 && strafe == -1){
        if (this.sendsprint.getValue()) mc.getPlayer().setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg-90))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg-90))*speed);
      }
    }
});
