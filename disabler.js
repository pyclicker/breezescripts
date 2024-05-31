/*
name: disabler
author: tygozeghthoi
*/
import { ModeSetting,BooleanSetting, breeze } from '../breeze_defs';

breeze.registerModule('Disabler', 'Cancels the sending of packets', {
    'mode': new ModeSetting('mode',"when to send the selected packets","always",["always","onGround","inAir"]),
    'digging': new BooleanSetting("no digging","do not send the digging packet",false),
    'swing': new BooleanSetting("no swing","do not send the swing packet",false),
    'blockplace': new BooleanSetting("no blockplace","do not send the place packet",false),
    'entitywrapper': new BooleanSetting("no entity packet","do not send the UseEntityWwrapper packet",false),
    'itemheld':  new BooleanSetting("no slotchange","do not send the slotchange packet",false),
    'enitityuse':  new BooleanSetting("no entityuse","do not send the entityuse packet",false),
    'pacticketketinput':  new BooleanSetting("no packetinput","do not send the packetinput packet",false),
    'confirmtransaction':  new BooleanSetting("no confirmtransaction","do not send the confirmtransaction packet",false),
    'keepalive':  new BooleanSetting("no keepalive","do not send the keepalive packet",false),
    'packetplayer': new BooleanSetting("no packetplayer","do not send the player packet",false),
    'packetSend': function(event) {
            if ((event.getPacket() instanceof C07PacketPlayerDigging&&this.digging.getValue())||(event.getPacket() instanceof C0APacketAnimation&&this.swing.getValue())||(event.getPacket() instanceof C08PacketBlockPlacement&&this.blockplace.getValue())||(event.getPacket() instanceof C02PacketUseEntity&&this.entitywrapper.getValue())||(event.getPacket() instanceof C09PacketHeldItemChange&&this.itemheld.getValue())||(event.getPacket() instanceof C0BPacketEntityAction&&this.enitityuse.getValue())||(event.getPacket() instanceof C0CPacketInput&&this.packetinput.getValue())||(event.getPacket() instanceof C0FPacketConfirmTransaction&&this.confirmtransaction.getValue())||(event.getPacket() instanceof C00PacketKeepAlive&&this.keepalive.getValue())||(event.getPacket() instanceof C03PacketPlayer &&  this.packetplayer.getValue())||(event.getPacket() instanceof C04PacketPlayerPosition &&  this.packetplayer.getValue())|| (event.getPacket() instanceof C05PacketPlayerLook &&  this.packetplayer.getValue())|| (event.getPacket() instanceof C06PacketPlayerPosLook &&  this.packetplayer.getValue())) {
            return;
        }
        if (this.mode.getValue() == "always"){
            return;
        }
        switch (this.mode.getValue()){
            case "onGround":
                if (event.getPacket() instanceof C03PacketPlayer){
                    if (event.getPacket().isOnGround()){
                        event.cancel();
                    }
                }
                return;
                break;
            case "inAir":
                if (event.getPacket() instanceof C03PacketPlayer){
                    if (!event.getPacket().isOnGround()){
                        event.cancel();
                    }
                }
        }
    }
});
