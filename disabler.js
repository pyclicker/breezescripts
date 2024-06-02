/*
name: disabler
author: tygozegthoi
*/
import { ModeSetting,BooleanSetting, breeze } from '../breeze_defs';

breeze.registerModule("Disabler", "Cancels the sending of packets.", {
    mode: new ModeSetting('Mode','When to send the selected packets.','Always',["Always","On Ground","In Air"]),
    digging: new BooleanSetting('No digging','Do not send the digging packet.',false),
    swing: new BooleanSetting('No swing','Do not send the swing packet.',false),
    blockplace: new BooleanSetting('No blockplace','Do not send the place packet.',false),
    entitywrapper: new BooleanSetting('No entity packet','Do not send the UseEntityWwrapper packet.',false),
    itemheld:  new BooleanSetting('No slotchange','Do not send the slotchange packet.',false),
    enitityuse:  new BooleanSetting('No entityuse','Do not send the entityuse packet.',false),
    pacticketketinput:  new BooleanSetting('No packetinput','Do not send the packetinput packet.',false),
    confirmtransaction:  new BooleanSetting('No confirmtransaction','Do not send the confirmtransaction packet.',false),
    keepalive:  new BooleanSetting('No keepalive','Do not send the keepalive packet.',false),
    packetplayer: new BooleanSetting('No packetplayer','Do not send the player packet.',false),
    packetSend: function(event) {
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
