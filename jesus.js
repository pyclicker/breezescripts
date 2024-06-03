/*
name: Jesus
author: tygozegthoi
*/
function degrees_to_radians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}
breeze.registerModule("Jesus", "Allows you to walk on water.", {
    vanilia: BooleanSetting("Vanilia Move","Vanilia movement",true),
    w: new KeyBindSetting("Forward","what key to use for forward"),
    s: new KeyBindSetting("Backward","what key to use for backward"),
    a: new KeyBindSetting("Left","what key to use for left"),
    d: new KeyBindSetting("Right","what key to use for right"),
    sendsprint: BooleanSetting('Multidirectional Sprint sending','Sends sprint packets when going in multiple directions even though it is not posible',false),
    motion: function(event) {
        var player = mc.getPlayer()
        if (player.isSneaking()) return
        if (player.y-.5 > Math.floor(player.y)) return
        if (BlockPos(Math.ceil(player.x),Math.floor(player.y)-1,Math.floor(player.z)).getBlockId() == 9||BlockPos(Math.ceil(player.x),Math.floor(player.y)-1,Math.floor(player.z)).getBlockId() == 11 || BlockPos(Math.floor(player.x),Math.floor(player.y)-1,Math.ceil(player.z)).getBlockId() == 9||BlockPos(Math.floor(player.x),Math.floor(player.y)-1,Math.ceil(player.z)).getBlockId() == 11 || BlockPos(Math.ceil(player.x),Math.floor(player.y)-1,Math.ceil(player.z)).getBlockId() == 9||BlockPos(Math.ceil(player.x),Math.floor(player.y)-1,Math.ceil(player.z)).getBlockId() == 11 || (BlockPos(Math.floor(player.x),Math.floor(player.y)-1,Math.floor(player.z)).getBlockId() == 9||BlockPos(Math.floor(player.x),Math.floor(player.y)-1,Math.floor(player.z)).getBlockId() == 11)){
              if (event.getY() < 0 && BlockPos(Math.floor(player.x),Math.floor(player.y),Math.floor(player.z)).getBlockId() != 9 && BlockPos(Math.floor(player.x),Math.floor(player.y),Math.floor(player.z)).getBlockId() != 11) event.setY(0)
              //if (!(event.getY() < 0 && BlockPos(Math.floor(player.x),Math.floor(player.y),Math.floor(player.z)).getBlockId() != 9 && BlockPos(Math.floor(player.x),Math.floor(player.y),Math.floor(player.z)).getBlockId() != 11)) player.setY(.4)
              if (this.vanilia.getValue())
              yaw = player.getLastYaw()
              deg = ((yaw-360*Math.floor(yaw/360)))
              var strafe = 0
              var fb = 0
              var forwardspeed = 0.21585
              var speed = 0.21585
              var forwardstrafe = 0.2205
              var backwardstrafe = 0.2205
              if (this.w.getValue().isDown()) fb += 1
              if (this.s.getValue().isDown()) fb -= 1
              if (this.a.getValue().isDown()) strafe -= 1
              if (this.d.getValue().isDown()) strafe += 1
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
               event.setX(-Math.sin(degrees_to_radians(deg+45))*forwardstrafe);
               event.setZ(Math.cos(degrees_to_radians(deg+45))*forwardstrafe);
              }
              if (fb == 1 && strafe == -1){
               player.setSprinting(true)
               event.setX(-Math.sin(degrees_to_radians(deg-45))*forwardstrafe);
               event.setZ(Math.cos(degrees_to_radians(deg-45))*forwardstrafe);
              }
              if (fb == -1 && strafe == 1){
               if (this.sendsprint.getValue()) player.setSprinting(true)
               event.setX(-Math.sin(degrees_to_radians(deg+180-45))*backwardstrafe);
               event.setZ(Math.cos(degrees_to_radians(deg+180-45))*backwardstrafe);
              }
              if (fb == -1 && strafe == -1){
               if (this.sendsprint.getValue()) player.setSprinting(true)
               event.setX(-Math.sin(degrees_to_radians(deg+180+45))*backwardstrafe);
               event.setZ(Math.cos(degrees_to_radians(deg+180+45))*backwardstrafe);
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
        }
    }
});