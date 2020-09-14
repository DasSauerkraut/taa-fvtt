export class DiceTAA {
    
    static rollTest(target){
        let roll = new Roll("1d100").roll();
        //SL Bonuses
        //Damage Bonuses
        //Target Bonuses

        //Add to Target
        target = target;
        //Test Failed
        let SL;
        let result;
        if(roll.total >= 96 || roll.total > target && roll.total > 5) {
        //Crit Failure
            result = game.i18n.localize("ROLL.Failure")
            if(roll.total % 11 === 0){
                result = game.i18n.localize("ROLL.Critical") + " " + result;
                SL = Math.floor(target / 10) - 10
            } else {
                SL = Math.floor(target / 10) - Math.floor(roll.total / 10)
            }

            if(roll.total >= 96 && SL > 11)
                SL = -1;

        
            //Test Successful
        } else if(roll.total <= target || roll.total <= 5 ) {
            //Crit Success
            result = game.i18n.localize("ROLL.Success")
            if(roll.total % 11 === 0){
                SL = Math.floor(target / 10)
                result = game.i18n.localize("ROLL.Critical") + " " + result;
            } else {
                SL = Math.floor(target / 10) - Math.floor(roll.total / 10)
            }

            if(roll.total <= 5 && SL < 1)
                SL = 1;
        }

        switch (Math.abs(Number(SL))) {
            case 6:
                result = game.i18n.localize("ROLL.Astounding") + ' ' + result;
                break;

            case 5:
            case 4:
                result = game.i18n.localize("ROLL.Impressive") + ' ' + result;
                break;

            case 3:
            case 2:
                break;

            case 1:
            case 0:
                result = game.i18n.localize("ROLL.Marginal") + ' ' + result;
                break;
            default:
                if (Math.abs(Number(SL)) > 6)
                    result = game.i18n.localize("ROLL.Astounding") + " " + result;
                break;
        }
        this.renderRoll({
            roll: roll.total,
            target: target,
            sl: SL,
            result: result
        })
    }

    static renderRoll(result){
        let chatContent = `<h3> ${result.result} </h3> Roll: ${result.roll} vs ${result.target} <br> SL: ${result.sl}`
        let chatData = {
          user: game.user._id,
          speaker: ChatMessage.getSpeaker(),
          content: chatContent
        };
        ChatMessage.create(chatData, {});
    }
}