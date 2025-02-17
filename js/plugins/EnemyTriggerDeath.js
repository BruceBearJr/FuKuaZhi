/*:
 * @plugindesc 让特定技能对特定敌人造成 HP 归零
 * @author 你的名字
 *
 * @help
 * 在技能备注（Note）里添加：
 * <TriggerEnemyDeath: X>
 * 其中 X 是要 HP 归零的敌人 ID。
 */

(function() {
    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.call(this, target);
        if (target.isEnemy() && this.item().meta["TriggerEnemyDeath"]) {
            const targetId = Number(this.item().meta["TriggerEnemyDeath"]);
            if (target.enemyId() === targetId) {
                target.setHp(0);
            }
        }
    };
})();
