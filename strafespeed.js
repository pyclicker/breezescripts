/*
name: strafespeed
author: Shoffli, Wallhacks and Tygozegthoi for the trigonometry
*/
var timer = Timer()
function degrees_to_radians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}
breeze.registerModule("Strafe Speed", "A speed which you can strafe with", {
      w: new KeyBindSetting("Forward","what key to use for forward"),
      s: new KeyBindSetting("Backward","what key to use for backward"),
      a: new KeyBindSetting("Left","what key to use for left"),
      d: new KeyBindSetting("Right","what key to use for right"),
      jump: BooleanSetting('Jump','jumps when on ground',true),
      speedtest: new DoubleSetting('Speedtest', 'Salalalla.', 1, 1, 10),
      alwayssprint: BooleanSetting('Multidirectional Sprint','Sprints in multiple directions when not posible',false),
      sendsprint: BooleanSetting('Multidirectional Sprint sending','Sends sprint packets when going in multiple directions even though it is not posible',false),
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
      if (this.w.getValue().isDown()) fb += 1
      if (this.s.getValue().isDown()) fb -= 1
      if (this.a.getValue().isDown()) strafe -= 1
      if (this.d.getValue().isDown()) strafe += 1
      var player = mc.getPlayer()
      if (fb == 0 && strafe == 0){
         event.setX(0);
         event.setZ(0);
      }
      if (fb == 1 && strafe == 0){
         player.setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg))*forwardspeed);
         event.setZ(Math.cos(degrees_to_radians(deg))*forwardspeed);
      }
      if (fb == -1 && strafe == 0){
        if (this.sendsprint.getValue()) player.setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg+180))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+180))*speed);
      }
      if (fb == 1 && strafe == 1){
        player.setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg+45))*0.2865);
         event.setZ(Math.cos(degrees_to_radians(deg+45))*0.2865);
      }
      if (fb == 1 && strafe == -1){
        player.setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg-45))*0.2865);
         event.setZ(Math.cos(degrees_to_radians(deg-45))*0.2865);
      }
      if (fb == -1 && strafe == 1){
        if (this.sendsprint.getValue()) player.setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg+180-45))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+180-45))*speed);
      }
      if (fb == -1 && strafe == -1){
        if (this.sendsprint.getValue()) player.setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg+180+45))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+180+45))*speed);
      }
      if (fb == 0 && strafe == 1){
        if (this.sendsprint.getValue()) player.setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg+90))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg+90))*speed);
      }
      if (fb == 0 && strafe == -1){
        if (this.sendsprint.getValue()) player.setSprinting(true)
         event.setX(-Math.sin(degrees_to_radians(deg-90))*speed);
         event.setZ(Math.cos(degrees_to_radians(deg-90))*speed);
      }
      if (mc.getPlayer().onGround() && this.jump.getValue()) {
         event.setY(.4)
         breeze.log('jump')
      }
    }
});
